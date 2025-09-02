/**
 * @generated SignedSource<<f8debc84f5cbe26f506cd4e4124634b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from 'relay-runtime';
export type ProfessionalCardFragment$data = {
  readonly address: {
    readonly distanceInMeters: number | null;
  } | null;
  readonly ordersAggregate: {
    readonly count: number;
  };
  readonly reviewsAggregate: {
    readonly avg: number;
    readonly count: number;
  };
  readonly serviceCategories: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
      };
    }>;
  };
  readonly user: {
    readonly image: {
      readonly url: string;
    };
    readonly name: string;
  };
  readonly ' $fragmentType': 'ProfessionalCardFragment';
};
export type ProfessionalCardFragment$key = {
  readonly ' $data'?: ProfessionalCardFragment$data;
  readonly ' $fragmentSpreads': FragmentRefs<'ProfessionalCardFragment'>;
};

const node: ReaderFragment = (function () {
  var v0 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'name',
      storageKey: null,
    },
    v1 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'count',
      storageKey: null,
    };
  return {
    argumentDefinitions: [],
    kind: 'Fragment',
    metadata: null,
    name: 'ProfessionalCardFragment',
    selections: [
      {
        alias: null,
        args: null,
        concreteType: 'Address',
        kind: 'LinkedField',
        name: 'address',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'distanceInMeters',
            storageKey: null,
          },
        ],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: 'User',
        kind: 'LinkedField',
        name: 'user',
        plural: false,
        selections: [
          v0 /*: any*/,
          {
            alias: null,
            args: null,
            concreteType: 'Image',
            kind: 'LinkedField',
            name: 'image',
            plural: false,
            selections: [
              {
                alias: null,
                args: null,
                kind: 'ScalarField',
                name: 'url',
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: 'ProfessionalServiceCategoriesConnection',
        kind: 'LinkedField',
        name: 'serviceCategories',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            concreteType: 'ProfessionalServiceCategoriesConnectionEdge',
            kind: 'LinkedField',
            name: 'edges',
            plural: true,
            selections: [
              {
                alias: null,
                args: null,
                concreteType: 'ServiceCategory',
                kind: 'LinkedField',
                name: 'node',
                plural: false,
                selections: [
                  {
                    alias: null,
                    args: null,
                    kind: 'ScalarField',
                    name: 'id',
                    storageKey: null,
                  },
                  v0 /*: any*/,
                ],
                storageKey: null,
              },
            ],
            storageKey: null,
          },
        ],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: 'Aggregate',
        kind: 'LinkedField',
        name: 'ordersAggregate',
        plural: false,
        selections: [v1 /*: any*/],
        storageKey: null,
      },
      {
        alias: null,
        args: null,
        concreteType: 'Aggregate',
        kind: 'LinkedField',
        name: 'reviewsAggregate',
        plural: false,
        selections: [
          {
            alias: null,
            args: null,
            kind: 'ScalarField',
            name: 'avg',
            storageKey: null,
          },
          v1 /*: any*/,
        ],
        storageKey: null,
      },
    ],
    type: 'Professional',
    abstractKey: null,
  };
})();

(node as any).hash = '52b6388df23fdeae9db2f8005358bf0e';

export default node;
