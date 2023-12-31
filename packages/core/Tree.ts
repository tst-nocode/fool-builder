import * as atoms from "@fool-builder/atoms";
import { CofeAtom, CofeMolecule, CofeTree } from "@fool-builder/types";
import { extractDefaults, makeId } from "@fool-builder/utils";
import { cloneDeep, isEqual, isEqualWith } from "lodash-es";
import { u } from "unist-builder";
import { map } from "unist-util-map";
import { parents } from "unist-util-parents";
import { Schema } from "./Schema";

export const cache = new WeakMap<object, CofeTree>();

export class Tree {
  private static createCompositeNode({
    type,
    properties,
    children,
  }: CofeMolecule["pattern"]): CofeTree {
    const atomicNode = Tree.create(type);

    if (properties) {
      atomicNode.properties = atomicNode.properties
        ? {
            ...atomicNode.properties,
            ...properties,
          }
        : {
            ...properties,
          };
    }

    if (children) {
      atomicNode.children = children?.map((c) => Tree.createCompositeNode(c));
    }

    return atomicNode;
  }

  private static createAtomicNode({ type, properties }: CofeAtom): CofeTree {
    const props: Omit<CofeTree, "type"> = {
      id: makeId(),
    };

    if (properties) {
      props.properties = extractDefaults(properties);
    }

    return u(type, props);
  }

  static create(schema: string | CofeAtom | CofeMolecule): CofeTree {
    if (typeof schema === "string") {
      if (schema in atoms) {
        schema = atoms[schema];
      } else {
        return u(schema, {
          id: makeId(),
        });
      }
    }

    if (Schema.isMolecule(schema as CofeMolecule)) {
      return Tree.createCompositeNode((schema as CofeMolecule).pattern);
    }

    return Tree.createAtomicNode(schema as CofeAtom);
  }

  /**
   * 深度复制整棵树
   */
  static copy(tree: CofeTree, makeNewIds?: boolean) {
    return makeNewIds
      ? (map(tree, ({ children, ...node }: CofeTree) => {
          return {
            ...cloneDeep(node),
            id: makeId(),
          };
        }) as CofeTree)
      : cloneDeep(tree);
  }

  /**
   * Check tree equality deeply
   */
  static isEqual(tree1: CofeTree, tree2: CofeTree) {
    return isEqual(tree1, tree2);
  }

  static isSame(tree1: CofeTree, tree2: CofeTree) {
    return isEqualWith(tree1, tree2, (v1, v2, key) => {
      // 跳过 id 比较
      if (key === "id") {
        return true;
      }
    });
  }

  static hydrate(tree: CofeTree) {
    if (!cache.has(tree)) {
      cache.set(tree, parents(tree as any) as CofeTree);
    }

    return cache.get(tree);
  }
}
