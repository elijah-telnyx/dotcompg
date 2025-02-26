/**
 * Snippet from https://gist.github.com/Convly/6cf1e6d143bb0a90c8de2242fdedda8e
 * Ref: https://docs.strapi.io/dev-docs/typescript/development#generate-typings-for-content-types-schemas
 */

import type { Schema, Utils, UID, Public } from '@strapi/types';

// https://github.com/microsoft/TypeScript/issues/50122
export type * as Strapi from '@strapi/types';

type IDProperty = { id: number; documentId: string };

type InvalidKeys<TSchemaUID extends UID.Schema> = Utils.Object.KeysBy<
  Schema.Attributes<TSchemaUID>,
  Schema.Attribute.Private | Schema.Attribute.Password
>;

export type GetValues<TSchemaUID extends UID.Schema> = {
  [TKey in Schema.OptionalAttributeNames<TSchemaUID>]?: Schema.AttributeByName<
    TSchemaUID,
    TKey
  > extends infer TAttribute extends Schema.Attribute.Attribute
    ? GetValue<TAttribute>
    : never;
} & {
  [TKey in Schema.RequiredAttributeNames<TSchemaUID>]-?: Schema.AttributeByName<
    TSchemaUID,
    TKey
  > extends infer TAttribute extends Schema.Attribute.Attribute
    ? GetValue<TAttribute>
    : never;
} extends infer TValues
  ? // Remove invalid keys (private, password)
    Omit<TValues, InvalidKeys<TSchemaUID>>
  : never;

// TODO: improve this typing condition to use Utils.If
type RelationValue<TAttribute extends Schema.Attribute.Attribute> = TAttribute extends Schema.Attribute.OneToMany<
  infer TTarget
>
  ? APIResponseData<TTarget>[]
  : TAttribute extends Schema.Attribute.OneToOne<infer TTarget>
  ? APIResponseData<TTarget>
  : unknown;

type ComponentValue<TAttribute extends Schema.Attribute.Attribute> = TAttribute extends Schema.Attribute.Component<
  infer TComponentUID,
  infer TRepeatable
>
  ? Utils.If<TRepeatable, (IDProperty & GetValues<TComponentUID>)[], IDProperty & GetValues<TComponentUID>>
  : never;

type DynamicZoneValue<TAttribute extends Schema.Attribute.Attribute> = TAttribute extends Schema.Attribute.DynamicZone<
  infer TComponentUIDs
>
  ? Array<
      Utils.Array.Values<TComponentUIDs> extends infer TComponentUID
        ? TComponentUID extends UID.Component
          ? { __component: TComponentUID } & IDProperty & GetValues<TComponentUID>
          : never
        : never
    >
  : never;

export type MediaValue<TAttribute extends Schema.Attribute.Attribute> = TAttribute extends Schema.Attribute.Media<
  infer _TKind,
  infer TMultiple
>
  ? Utils.If<TMultiple, APIResponseData<'plugin::upload.file'>[], APIResponseData<'plugin::upload.file'>>
  : never;

export type GetValue<TAttribute extends Schema.Attribute.Attribute> = Utils.If<
  Utils.IsNotNever<TAttribute>,
  Utils.MatchFirst<
    [
      // Relation
      [Utils.Extends<TAttribute, Schema.Attribute.OfType<'relation'>>, RelationValue<TAttribute>],
      // DynamicZone
      [Utils.Extends<TAttribute, Schema.Attribute.OfType<'dynamiczone'>>, DynamicZoneValue<TAttribute>],
      // Component
      [Utils.Extends<TAttribute, Schema.Attribute.OfType<'component'>>, ComponentValue<TAttribute>],
      // Media
      [Utils.Extends<TAttribute, Schema.Attribute.OfType<'media'>>, MediaValue<TAttribute>],
      // Fallback
      // If none of the above attribute type, fallback to the original Schema.Attribute.Value (while making sure it's an attribute)
      [Utils.Constants.True, Schema.Attribute.Value<TAttribute, unknown>]
    ],
    unknown
  >,
  unknown
>;

export type ComponentResponseData<TComponent extends UID.Component> = IDProperty & GetValues<TComponent>;

type APIResponseData<TContentTypeUID extends UID.ContentType> = IDProperty & GetValues<TContentTypeUID>;

export interface APIResponseCollectionMetadata {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export type APIResponseByDocumentID<
  TContentTypeUID extends UID.ContentType,
  TDocumentID extends string | undefined = undefined
> = TDocumentID extends string ? APIResponse<TContentTypeUID> : APIResponseCollection<TContentTypeUID>;

export interface APIResponse<TContentTypeUID extends UID.ContentType> {
  data: APIResponseData<TContentTypeUID>;
}

export interface APIResponseCollection<TContentTypeUID extends UID.ContentType> {
  data: APIResponseData<TContentTypeUID>[];
  meta: {
    pagination: APIResponseCollectionMetadata;
  };
}

export type OperatorValue = string | number;

// generated via Claude from docs in https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering -- don't trust it blindly
export interface FilterOperators<Field extends string> {
  $eq?: OperatorValue;
  $eqi?: OperatorValue;
  $ne?: OperatorValue;
  $nei?: OperatorValue;
  $lt?: OperatorValue;
  $lte?: OperatorValue;
  $gt?: OperatorValue;
  $gte?: OperatorValue;
  $in?: OperatorValue[];
  $notIn?: OperatorValue[];
  $contains?: OperatorValue;
  $notContains?: OperatorValue;
  $containsi?: OperatorValue;
  $notContainsi?: OperatorValue;
  $null?: boolean;
  $notNull?: boolean;
  $between?: [OperatorValue, OperatorValue];
  $startsWith?: OperatorValue;
  $startsWithi?: OperatorValue;
  $endsWith?: OperatorValue;
  $endsWithi?: OperatorValue;
  $or?: QueryFilter<Field>['filters'][];
  $and?: QueryFilter<Field>['filters'][];
  $not?: QueryFilter<Field>['filters'];
}

export interface QueryFilter<Field extends string = string> {
  status?: 'published' | 'draft';
  sort?: Field | Field[] | `${Field}:${'asc' | 'desc'}` | `${Field}:${'asc' | 'desc'}`[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  populate?:
    | {
        [key in Field]?: {
          populate?: string[];
          fields?: string[];
          // https://docs.strapi.io/dev-docs/api/rest/guides/understanding-populate#populate-dynamic-zones
          on?: {
            [subkey in keyof Public.ComponentSchemas]?: {
              populate?:
                | {
                    [subsubkey in string]?: {
                      populate: string[] | '*' | { [subsubsubkey in string]?: { populate: string[] | '*' } };
                    };
                  }
                | string[]
                | '*';
            };
          };
        };
      }
    | '*';
  filters?: {
    [key in Field]?: FilterOperators<Field> | { [key: string]: FilterOperators<Field> };
  };
}

export interface GetOptions {
  preview?: boolean;
  singleType?: boolean;
}

export interface ReleaseNotesQueryParams {
  page?: number;
  limit?: number;
  tag?: string;
  slug?: string;
}
