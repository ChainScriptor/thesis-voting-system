
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model election
 * 
 */
export type election = $Result.DefaultSelection<Prisma.$electionPayload>
/**
 * Model poll_candidates
 * 
 */
export type poll_candidates = $Result.DefaultSelection<Prisma.$poll_candidatesPayload>
/**
 * Model takepart
 * 
 */
export type takepart = $Result.DefaultSelection<Prisma.$takepartPayload>
/**
 * Model user
 * 
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>
/**
 * Model Vote
 * 
 */
export type Vote = $Result.DefaultSelection<Prisma.$VotePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Elections
 * const elections = await prisma.election.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Elections
   * const elections = await prisma.election.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.election`: Exposes CRUD operations for the **election** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Elections
    * const elections = await prisma.election.findMany()
    * ```
    */
  get election(): Prisma.electionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.poll_candidates`: Exposes CRUD operations for the **poll_candidates** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Poll_candidates
    * const poll_candidates = await prisma.poll_candidates.findMany()
    * ```
    */
  get poll_candidates(): Prisma.poll_candidatesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.takepart`: Exposes CRUD operations for the **takepart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Takeparts
    * const takeparts = await prisma.takepart.findMany()
    * ```
    */
  get takepart(): Prisma.takepartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vote`: Exposes CRUD operations for the **Vote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Votes
    * const votes = await prisma.vote.findMany()
    * ```
    */
  get vote(): Prisma.VoteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    election: 'election',
    poll_candidates: 'poll_candidates',
    takepart: 'takepart',
    user: 'user',
    Vote: 'Vote'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "election" | "poll_candidates" | "takepart" | "user" | "vote"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      election: {
        payload: Prisma.$electionPayload<ExtArgs>
        fields: Prisma.electionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.electionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.electionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionPayload>
          }
          findFirst: {
            args: Prisma.electionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.electionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionPayload>
          }
          findMany: {
            args: Prisma.electionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionPayload>[]
          }
          create: {
            args: Prisma.electionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionPayload>
          }
          createMany: {
            args: Prisma.electionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.electionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionPayload>[]
          }
          delete: {
            args: Prisma.electionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionPayload>
          }
          update: {
            args: Prisma.electionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionPayload>
          }
          deleteMany: {
            args: Prisma.electionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.electionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.electionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionPayload>[]
          }
          upsert: {
            args: Prisma.electionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$electionPayload>
          }
          aggregate: {
            args: Prisma.ElectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateElection>
          }
          groupBy: {
            args: Prisma.electionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ElectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.electionCountArgs<ExtArgs>
            result: $Utils.Optional<ElectionCountAggregateOutputType> | number
          }
        }
      }
      poll_candidates: {
        payload: Prisma.$poll_candidatesPayload<ExtArgs>
        fields: Prisma.poll_candidatesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.poll_candidatesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poll_candidatesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.poll_candidatesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poll_candidatesPayload>
          }
          findFirst: {
            args: Prisma.poll_candidatesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poll_candidatesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.poll_candidatesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poll_candidatesPayload>
          }
          findMany: {
            args: Prisma.poll_candidatesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poll_candidatesPayload>[]
          }
          create: {
            args: Prisma.poll_candidatesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poll_candidatesPayload>
          }
          createMany: {
            args: Prisma.poll_candidatesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.poll_candidatesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poll_candidatesPayload>[]
          }
          delete: {
            args: Prisma.poll_candidatesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poll_candidatesPayload>
          }
          update: {
            args: Prisma.poll_candidatesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poll_candidatesPayload>
          }
          deleteMany: {
            args: Prisma.poll_candidatesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.poll_candidatesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.poll_candidatesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poll_candidatesPayload>[]
          }
          upsert: {
            args: Prisma.poll_candidatesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poll_candidatesPayload>
          }
          aggregate: {
            args: Prisma.Poll_candidatesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePoll_candidates>
          }
          groupBy: {
            args: Prisma.poll_candidatesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Poll_candidatesGroupByOutputType>[]
          }
          count: {
            args: Prisma.poll_candidatesCountArgs<ExtArgs>
            result: $Utils.Optional<Poll_candidatesCountAggregateOutputType> | number
          }
        }
      }
      takepart: {
        payload: Prisma.$takepartPayload<ExtArgs>
        fields: Prisma.takepartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.takepartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$takepartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.takepartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$takepartPayload>
          }
          findFirst: {
            args: Prisma.takepartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$takepartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.takepartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$takepartPayload>
          }
          findMany: {
            args: Prisma.takepartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$takepartPayload>[]
          }
          create: {
            args: Prisma.takepartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$takepartPayload>
          }
          createMany: {
            args: Prisma.takepartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.takepartCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$takepartPayload>[]
          }
          delete: {
            args: Prisma.takepartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$takepartPayload>
          }
          update: {
            args: Prisma.takepartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$takepartPayload>
          }
          deleteMany: {
            args: Prisma.takepartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.takepartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.takepartUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$takepartPayload>[]
          }
          upsert: {
            args: Prisma.takepartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$takepartPayload>
          }
          aggregate: {
            args: Prisma.TakepartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTakepart>
          }
          groupBy: {
            args: Prisma.takepartGroupByArgs<ExtArgs>
            result: $Utils.Optional<TakepartGroupByOutputType>[]
          }
          count: {
            args: Prisma.takepartCountArgs<ExtArgs>
            result: $Utils.Optional<TakepartCountAggregateOutputType> | number
          }
        }
      }
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.userCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.userUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Vote: {
        payload: Prisma.$VotePayload<ExtArgs>
        fields: Prisma.VoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          findFirst: {
            args: Prisma.VoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          findMany: {
            args: Prisma.VoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[]
          }
          create: {
            args: Prisma.VoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          createMany: {
            args: Prisma.VoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[]
          }
          delete: {
            args: Prisma.VoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          update: {
            args: Prisma.VoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          deleteMany: {
            args: Prisma.VoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[]
          }
          upsert: {
            args: Prisma.VoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          aggregate: {
            args: Prisma.VoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVote>
          }
          groupBy: {
            args: Prisma.VoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<VoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.VoteCountArgs<ExtArgs>
            result: $Utils.Optional<VoteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    election?: electionOmit
    poll_candidates?: poll_candidatesOmit
    takepart?: takepartOmit
    user?: userOmit
    vote?: VoteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ElectionCountOutputType
   */

  export type ElectionCountOutputType = {
    poll_candidates: number
    takepart: number
    votes: number
  }

  export type ElectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    poll_candidates?: boolean | ElectionCountOutputTypeCountPoll_candidatesArgs
    takepart?: boolean | ElectionCountOutputTypeCountTakepartArgs
    votes?: boolean | ElectionCountOutputTypeCountVotesArgs
  }

  // Custom InputTypes
  /**
   * ElectionCountOutputType without action
   */
  export type ElectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElectionCountOutputType
     */
    select?: ElectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ElectionCountOutputType without action
   */
  export type ElectionCountOutputTypeCountPoll_candidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: poll_candidatesWhereInput
  }

  /**
   * ElectionCountOutputType without action
   */
  export type ElectionCountOutputTypeCountTakepartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: takepartWhereInput
  }

  /**
   * ElectionCountOutputType without action
   */
  export type ElectionCountOutputTypeCountVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    election: number
    poll_candidates: number
    takepart: number
    votes: number
    candidateVotes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    election?: boolean | UserCountOutputTypeCountElectionArgs
    poll_candidates?: boolean | UserCountOutputTypeCountPoll_candidatesArgs
    takepart?: boolean | UserCountOutputTypeCountTakepartArgs
    votes?: boolean | UserCountOutputTypeCountVotesArgs
    candidateVotes?: boolean | UserCountOutputTypeCountCandidateVotesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountElectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: electionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPoll_candidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: poll_candidatesWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTakepartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: takepartWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCandidateVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model election
   */

  export type AggregateElection = {
    _count: ElectionCountAggregateOutputType | null
    _avg: ElectionAvgAggregateOutputType | null
    _sum: ElectionSumAggregateOutputType | null
    _min: ElectionMinAggregateOutputType | null
    _max: ElectionMaxAggregateOutputType | null
  }

  export type ElectionAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ElectionSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ElectionMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    start_date: Date | null
    end_date: Date | null
    is_active: boolean | null
    target_occupation: string | null
    target_location: string | null
    birthdate_min: Date | null
    birthdate_max: Date | null
    target_gender: string | null
    userId: number | null
  }

  export type ElectionMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    start_date: Date | null
    end_date: Date | null
    is_active: boolean | null
    target_occupation: string | null
    target_location: string | null
    birthdate_min: Date | null
    birthdate_max: Date | null
    target_gender: string | null
    userId: number | null
  }

  export type ElectionCountAggregateOutputType = {
    id: number
    title: number
    description: number
    start_date: number
    end_date: number
    is_active: number
    target_occupation: number
    target_location: number
    birthdate_min: number
    birthdate_max: number
    target_gender: number
    userId: number
    _all: number
  }


  export type ElectionAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ElectionSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ElectionMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    start_date?: true
    end_date?: true
    is_active?: true
    target_occupation?: true
    target_location?: true
    birthdate_min?: true
    birthdate_max?: true
    target_gender?: true
    userId?: true
  }

  export type ElectionMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    start_date?: true
    end_date?: true
    is_active?: true
    target_occupation?: true
    target_location?: true
    birthdate_min?: true
    birthdate_max?: true
    target_gender?: true
    userId?: true
  }

  export type ElectionCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    start_date?: true
    end_date?: true
    is_active?: true
    target_occupation?: true
    target_location?: true
    birthdate_min?: true
    birthdate_max?: true
    target_gender?: true
    userId?: true
    _all?: true
  }

  export type ElectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which election to aggregate.
     */
    where?: electionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of elections to fetch.
     */
    orderBy?: electionOrderByWithRelationInput | electionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: electionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` elections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` elections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned elections
    **/
    _count?: true | ElectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ElectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ElectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ElectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ElectionMaxAggregateInputType
  }

  export type GetElectionAggregateType<T extends ElectionAggregateArgs> = {
        [P in keyof T & keyof AggregateElection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElection[P]>
      : GetScalarType<T[P], AggregateElection[P]>
  }




  export type electionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: electionWhereInput
    orderBy?: electionOrderByWithAggregationInput | electionOrderByWithAggregationInput[]
    by: ElectionScalarFieldEnum[] | ElectionScalarFieldEnum
    having?: electionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ElectionCountAggregateInputType | true
    _avg?: ElectionAvgAggregateInputType
    _sum?: ElectionSumAggregateInputType
    _min?: ElectionMinAggregateInputType
    _max?: ElectionMaxAggregateInputType
  }

  export type ElectionGroupByOutputType = {
    id: number
    title: string
    description: string | null
    start_date: Date
    end_date: Date
    is_active: boolean
    target_occupation: string | null
    target_location: string | null
    birthdate_min: Date | null
    birthdate_max: Date | null
    target_gender: string | null
    userId: number
    _count: ElectionCountAggregateOutputType | null
    _avg: ElectionAvgAggregateOutputType | null
    _sum: ElectionSumAggregateOutputType | null
    _min: ElectionMinAggregateOutputType | null
    _max: ElectionMaxAggregateOutputType | null
  }

  type GetElectionGroupByPayload<T extends electionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ElectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ElectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ElectionGroupByOutputType[P]>
            : GetScalarType<T[P], ElectionGroupByOutputType[P]>
        }
      >
    >


  export type electionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    start_date?: boolean
    end_date?: boolean
    is_active?: boolean
    target_occupation?: boolean
    target_location?: boolean
    birthdate_min?: boolean
    birthdate_max?: boolean
    target_gender?: boolean
    userId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    poll_candidates?: boolean | election$poll_candidatesArgs<ExtArgs>
    takepart?: boolean | election$takepartArgs<ExtArgs>
    votes?: boolean | election$votesArgs<ExtArgs>
    _count?: boolean | ElectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["election"]>

  export type electionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    start_date?: boolean
    end_date?: boolean
    is_active?: boolean
    target_occupation?: boolean
    target_location?: boolean
    birthdate_min?: boolean
    birthdate_max?: boolean
    target_gender?: boolean
    userId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["election"]>

  export type electionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    start_date?: boolean
    end_date?: boolean
    is_active?: boolean
    target_occupation?: boolean
    target_location?: boolean
    birthdate_min?: boolean
    birthdate_max?: boolean
    target_gender?: boolean
    userId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["election"]>

  export type electionSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    start_date?: boolean
    end_date?: boolean
    is_active?: boolean
    target_occupation?: boolean
    target_location?: boolean
    birthdate_min?: boolean
    birthdate_max?: boolean
    target_gender?: boolean
    userId?: boolean
  }

  export type electionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "start_date" | "end_date" | "is_active" | "target_occupation" | "target_location" | "birthdate_min" | "birthdate_max" | "target_gender" | "userId", ExtArgs["result"]["election"]>
  export type electionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    poll_candidates?: boolean | election$poll_candidatesArgs<ExtArgs>
    takepart?: boolean | election$takepartArgs<ExtArgs>
    votes?: boolean | election$votesArgs<ExtArgs>
    _count?: boolean | ElectionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type electionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type electionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $electionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "election"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
      poll_candidates: Prisma.$poll_candidatesPayload<ExtArgs>[]
      takepart: Prisma.$takepartPayload<ExtArgs>[]
      votes: Prisma.$VotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      start_date: Date
      end_date: Date
      is_active: boolean
      target_occupation: string | null
      target_location: string | null
      birthdate_min: Date | null
      birthdate_max: Date | null
      target_gender: string | null
      userId: number
    }, ExtArgs["result"]["election"]>
    composites: {}
  }

  type electionGetPayload<S extends boolean | null | undefined | electionDefaultArgs> = $Result.GetResult<Prisma.$electionPayload, S>

  type electionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<electionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ElectionCountAggregateInputType | true
    }

  export interface electionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['election'], meta: { name: 'election' } }
    /**
     * Find zero or one Election that matches the filter.
     * @param {electionFindUniqueArgs} args - Arguments to find a Election
     * @example
     * // Get one Election
     * const election = await prisma.election.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends electionFindUniqueArgs>(args: SelectSubset<T, electionFindUniqueArgs<ExtArgs>>): Prisma__electionClient<$Result.GetResult<Prisma.$electionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Election that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {electionFindUniqueOrThrowArgs} args - Arguments to find a Election
     * @example
     * // Get one Election
     * const election = await prisma.election.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends electionFindUniqueOrThrowArgs>(args: SelectSubset<T, electionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__electionClient<$Result.GetResult<Prisma.$electionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Election that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {electionFindFirstArgs} args - Arguments to find a Election
     * @example
     * // Get one Election
     * const election = await prisma.election.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends electionFindFirstArgs>(args?: SelectSubset<T, electionFindFirstArgs<ExtArgs>>): Prisma__electionClient<$Result.GetResult<Prisma.$electionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Election that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {electionFindFirstOrThrowArgs} args - Arguments to find a Election
     * @example
     * // Get one Election
     * const election = await prisma.election.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends electionFindFirstOrThrowArgs>(args?: SelectSubset<T, electionFindFirstOrThrowArgs<ExtArgs>>): Prisma__electionClient<$Result.GetResult<Prisma.$electionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Elections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {electionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Elections
     * const elections = await prisma.election.findMany()
     * 
     * // Get first 10 Elections
     * const elections = await prisma.election.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const electionWithIdOnly = await prisma.election.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends electionFindManyArgs>(args?: SelectSubset<T, electionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$electionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Election.
     * @param {electionCreateArgs} args - Arguments to create a Election.
     * @example
     * // Create one Election
     * const Election = await prisma.election.create({
     *   data: {
     *     // ... data to create a Election
     *   }
     * })
     * 
     */
    create<T extends electionCreateArgs>(args: SelectSubset<T, electionCreateArgs<ExtArgs>>): Prisma__electionClient<$Result.GetResult<Prisma.$electionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Elections.
     * @param {electionCreateManyArgs} args - Arguments to create many Elections.
     * @example
     * // Create many Elections
     * const election = await prisma.election.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends electionCreateManyArgs>(args?: SelectSubset<T, electionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Elections and returns the data saved in the database.
     * @param {electionCreateManyAndReturnArgs} args - Arguments to create many Elections.
     * @example
     * // Create many Elections
     * const election = await prisma.election.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Elections and only return the `id`
     * const electionWithIdOnly = await prisma.election.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends electionCreateManyAndReturnArgs>(args?: SelectSubset<T, electionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$electionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Election.
     * @param {electionDeleteArgs} args - Arguments to delete one Election.
     * @example
     * // Delete one Election
     * const Election = await prisma.election.delete({
     *   where: {
     *     // ... filter to delete one Election
     *   }
     * })
     * 
     */
    delete<T extends electionDeleteArgs>(args: SelectSubset<T, electionDeleteArgs<ExtArgs>>): Prisma__electionClient<$Result.GetResult<Prisma.$electionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Election.
     * @param {electionUpdateArgs} args - Arguments to update one Election.
     * @example
     * // Update one Election
     * const election = await prisma.election.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends electionUpdateArgs>(args: SelectSubset<T, electionUpdateArgs<ExtArgs>>): Prisma__electionClient<$Result.GetResult<Prisma.$electionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Elections.
     * @param {electionDeleteManyArgs} args - Arguments to filter Elections to delete.
     * @example
     * // Delete a few Elections
     * const { count } = await prisma.election.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends electionDeleteManyArgs>(args?: SelectSubset<T, electionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Elections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {electionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Elections
     * const election = await prisma.election.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends electionUpdateManyArgs>(args: SelectSubset<T, electionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Elections and returns the data updated in the database.
     * @param {electionUpdateManyAndReturnArgs} args - Arguments to update many Elections.
     * @example
     * // Update many Elections
     * const election = await prisma.election.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Elections and only return the `id`
     * const electionWithIdOnly = await prisma.election.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends electionUpdateManyAndReturnArgs>(args: SelectSubset<T, electionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$electionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Election.
     * @param {electionUpsertArgs} args - Arguments to update or create a Election.
     * @example
     * // Update or create a Election
     * const election = await prisma.election.upsert({
     *   create: {
     *     // ... data to create a Election
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Election we want to update
     *   }
     * })
     */
    upsert<T extends electionUpsertArgs>(args: SelectSubset<T, electionUpsertArgs<ExtArgs>>): Prisma__electionClient<$Result.GetResult<Prisma.$electionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Elections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {electionCountArgs} args - Arguments to filter Elections to count.
     * @example
     * // Count the number of Elections
     * const count = await prisma.election.count({
     *   where: {
     *     // ... the filter for the Elections we want to count
     *   }
     * })
    **/
    count<T extends electionCountArgs>(
      args?: Subset<T, electionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ElectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Election.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ElectionAggregateArgs>(args: Subset<T, ElectionAggregateArgs>): Prisma.PrismaPromise<GetElectionAggregateType<T>>

    /**
     * Group by Election.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {electionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends electionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: electionGroupByArgs['orderBy'] }
        : { orderBy?: electionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, electionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the election model
   */
  readonly fields: electionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for election.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__electionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    poll_candidates<T extends election$poll_candidatesArgs<ExtArgs> = {}>(args?: Subset<T, election$poll_candidatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$poll_candidatesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    takepart<T extends election$takepartArgs<ExtArgs> = {}>(args?: Subset<T, election$takepartArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$takepartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    votes<T extends election$votesArgs<ExtArgs> = {}>(args?: Subset<T, election$votesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the election model
   */
  interface electionFieldRefs {
    readonly id: FieldRef<"election", 'Int'>
    readonly title: FieldRef<"election", 'String'>
    readonly description: FieldRef<"election", 'String'>
    readonly start_date: FieldRef<"election", 'DateTime'>
    readonly end_date: FieldRef<"election", 'DateTime'>
    readonly is_active: FieldRef<"election", 'Boolean'>
    readonly target_occupation: FieldRef<"election", 'String'>
    readonly target_location: FieldRef<"election", 'String'>
    readonly birthdate_min: FieldRef<"election", 'DateTime'>
    readonly birthdate_max: FieldRef<"election", 'DateTime'>
    readonly target_gender: FieldRef<"election", 'String'>
    readonly userId: FieldRef<"election", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * election findUnique
   */
  export type electionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the election
     */
    select?: electionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the election
     */
    omit?: electionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionInclude<ExtArgs> | null
    /**
     * Filter, which election to fetch.
     */
    where: electionWhereUniqueInput
  }

  /**
   * election findUniqueOrThrow
   */
  export type electionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the election
     */
    select?: electionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the election
     */
    omit?: electionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionInclude<ExtArgs> | null
    /**
     * Filter, which election to fetch.
     */
    where: electionWhereUniqueInput
  }

  /**
   * election findFirst
   */
  export type electionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the election
     */
    select?: electionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the election
     */
    omit?: electionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionInclude<ExtArgs> | null
    /**
     * Filter, which election to fetch.
     */
    where?: electionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of elections to fetch.
     */
    orderBy?: electionOrderByWithRelationInput | electionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for elections.
     */
    cursor?: electionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` elections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` elections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of elections.
     */
    distinct?: ElectionScalarFieldEnum | ElectionScalarFieldEnum[]
  }

  /**
   * election findFirstOrThrow
   */
  export type electionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the election
     */
    select?: electionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the election
     */
    omit?: electionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionInclude<ExtArgs> | null
    /**
     * Filter, which election to fetch.
     */
    where?: electionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of elections to fetch.
     */
    orderBy?: electionOrderByWithRelationInput | electionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for elections.
     */
    cursor?: electionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` elections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` elections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of elections.
     */
    distinct?: ElectionScalarFieldEnum | ElectionScalarFieldEnum[]
  }

  /**
   * election findMany
   */
  export type electionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the election
     */
    select?: electionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the election
     */
    omit?: electionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionInclude<ExtArgs> | null
    /**
     * Filter, which elections to fetch.
     */
    where?: electionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of elections to fetch.
     */
    orderBy?: electionOrderByWithRelationInput | electionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing elections.
     */
    cursor?: electionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` elections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` elections.
     */
    skip?: number
    distinct?: ElectionScalarFieldEnum | ElectionScalarFieldEnum[]
  }

  /**
   * election create
   */
  export type electionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the election
     */
    select?: electionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the election
     */
    omit?: electionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionInclude<ExtArgs> | null
    /**
     * The data needed to create a election.
     */
    data: XOR<electionCreateInput, electionUncheckedCreateInput>
  }

  /**
   * election createMany
   */
  export type electionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many elections.
     */
    data: electionCreateManyInput | electionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * election createManyAndReturn
   */
  export type electionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the election
     */
    select?: electionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the election
     */
    omit?: electionOmit<ExtArgs> | null
    /**
     * The data used to create many elections.
     */
    data: electionCreateManyInput | electionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * election update
   */
  export type electionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the election
     */
    select?: electionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the election
     */
    omit?: electionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionInclude<ExtArgs> | null
    /**
     * The data needed to update a election.
     */
    data: XOR<electionUpdateInput, electionUncheckedUpdateInput>
    /**
     * Choose, which election to update.
     */
    where: electionWhereUniqueInput
  }

  /**
   * election updateMany
   */
  export type electionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update elections.
     */
    data: XOR<electionUpdateManyMutationInput, electionUncheckedUpdateManyInput>
    /**
     * Filter which elections to update
     */
    where?: electionWhereInput
    /**
     * Limit how many elections to update.
     */
    limit?: number
  }

  /**
   * election updateManyAndReturn
   */
  export type electionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the election
     */
    select?: electionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the election
     */
    omit?: electionOmit<ExtArgs> | null
    /**
     * The data used to update elections.
     */
    data: XOR<electionUpdateManyMutationInput, electionUncheckedUpdateManyInput>
    /**
     * Filter which elections to update
     */
    where?: electionWhereInput
    /**
     * Limit how many elections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * election upsert
   */
  export type electionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the election
     */
    select?: electionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the election
     */
    omit?: electionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionInclude<ExtArgs> | null
    /**
     * The filter to search for the election to update in case it exists.
     */
    where: electionWhereUniqueInput
    /**
     * In case the election found by the `where` argument doesn't exist, create a new election with this data.
     */
    create: XOR<electionCreateInput, electionUncheckedCreateInput>
    /**
     * In case the election was found with the provided `where` argument, update it with this data.
     */
    update: XOR<electionUpdateInput, electionUncheckedUpdateInput>
  }

  /**
   * election delete
   */
  export type electionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the election
     */
    select?: electionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the election
     */
    omit?: electionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionInclude<ExtArgs> | null
    /**
     * Filter which election to delete.
     */
    where: electionWhereUniqueInput
  }

  /**
   * election deleteMany
   */
  export type electionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which elections to delete
     */
    where?: electionWhereInput
    /**
     * Limit how many elections to delete.
     */
    limit?: number
  }

  /**
   * election.poll_candidates
   */
  export type election$poll_candidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poll_candidates
     */
    select?: poll_candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poll_candidates
     */
    omit?: poll_candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: poll_candidatesInclude<ExtArgs> | null
    where?: poll_candidatesWhereInput
    orderBy?: poll_candidatesOrderByWithRelationInput | poll_candidatesOrderByWithRelationInput[]
    cursor?: poll_candidatesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Poll_candidatesScalarFieldEnum | Poll_candidatesScalarFieldEnum[]
  }

  /**
   * election.takepart
   */
  export type election$takepartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the takepart
     */
    select?: takepartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the takepart
     */
    omit?: takepartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: takepartInclude<ExtArgs> | null
    where?: takepartWhereInput
    orderBy?: takepartOrderByWithRelationInput | takepartOrderByWithRelationInput[]
    cursor?: takepartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TakepartScalarFieldEnum | TakepartScalarFieldEnum[]
  }

  /**
   * election.votes
   */
  export type election$votesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    cursor?: VoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * election without action
   */
  export type electionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the election
     */
    select?: electionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the election
     */
    omit?: electionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionInclude<ExtArgs> | null
  }


  /**
   * Model poll_candidates
   */

  export type AggregatePoll_candidates = {
    _count: Poll_candidatesCountAggregateOutputType | null
    _avg: Poll_candidatesAvgAggregateOutputType | null
    _sum: Poll_candidatesSumAggregateOutputType | null
    _min: Poll_candidatesMinAggregateOutputType | null
    _max: Poll_candidatesMaxAggregateOutputType | null
  }

  export type Poll_candidatesAvgAggregateOutputType = {
    id: number | null
    poll_id: number | null
    user_id: number | null
  }

  export type Poll_candidatesSumAggregateOutputType = {
    id: number | null
    poll_id: number | null
    user_id: number | null
  }

  export type Poll_candidatesMinAggregateOutputType = {
    id: number | null
    poll_id: number | null
    user_id: number | null
    invited_at: Date | null
  }

  export type Poll_candidatesMaxAggregateOutputType = {
    id: number | null
    poll_id: number | null
    user_id: number | null
    invited_at: Date | null
  }

  export type Poll_candidatesCountAggregateOutputType = {
    id: number
    poll_id: number
    user_id: number
    invited_at: number
    _all: number
  }


  export type Poll_candidatesAvgAggregateInputType = {
    id?: true
    poll_id?: true
    user_id?: true
  }

  export type Poll_candidatesSumAggregateInputType = {
    id?: true
    poll_id?: true
    user_id?: true
  }

  export type Poll_candidatesMinAggregateInputType = {
    id?: true
    poll_id?: true
    user_id?: true
    invited_at?: true
  }

  export type Poll_candidatesMaxAggregateInputType = {
    id?: true
    poll_id?: true
    user_id?: true
    invited_at?: true
  }

  export type Poll_candidatesCountAggregateInputType = {
    id?: true
    poll_id?: true
    user_id?: true
    invited_at?: true
    _all?: true
  }

  export type Poll_candidatesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which poll_candidates to aggregate.
     */
    where?: poll_candidatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of poll_candidates to fetch.
     */
    orderBy?: poll_candidatesOrderByWithRelationInput | poll_candidatesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: poll_candidatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` poll_candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` poll_candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned poll_candidates
    **/
    _count?: true | Poll_candidatesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Poll_candidatesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Poll_candidatesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Poll_candidatesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Poll_candidatesMaxAggregateInputType
  }

  export type GetPoll_candidatesAggregateType<T extends Poll_candidatesAggregateArgs> = {
        [P in keyof T & keyof AggregatePoll_candidates]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePoll_candidates[P]>
      : GetScalarType<T[P], AggregatePoll_candidates[P]>
  }




  export type poll_candidatesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: poll_candidatesWhereInput
    orderBy?: poll_candidatesOrderByWithAggregationInput | poll_candidatesOrderByWithAggregationInput[]
    by: Poll_candidatesScalarFieldEnum[] | Poll_candidatesScalarFieldEnum
    having?: poll_candidatesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Poll_candidatesCountAggregateInputType | true
    _avg?: Poll_candidatesAvgAggregateInputType
    _sum?: Poll_candidatesSumAggregateInputType
    _min?: Poll_candidatesMinAggregateInputType
    _max?: Poll_candidatesMaxAggregateInputType
  }

  export type Poll_candidatesGroupByOutputType = {
    id: number
    poll_id: number
    user_id: number
    invited_at: Date
    _count: Poll_candidatesCountAggregateOutputType | null
    _avg: Poll_candidatesAvgAggregateOutputType | null
    _sum: Poll_candidatesSumAggregateOutputType | null
    _min: Poll_candidatesMinAggregateOutputType | null
    _max: Poll_candidatesMaxAggregateOutputType | null
  }

  type GetPoll_candidatesGroupByPayload<T extends poll_candidatesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Poll_candidatesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Poll_candidatesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Poll_candidatesGroupByOutputType[P]>
            : GetScalarType<T[P], Poll_candidatesGroupByOutputType[P]>
        }
      >
    >


  export type poll_candidatesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poll_id?: boolean
    user_id?: boolean
    invited_at?: boolean
    election?: boolean | electionDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["poll_candidates"]>

  export type poll_candidatesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poll_id?: boolean
    user_id?: boolean
    invited_at?: boolean
    election?: boolean | electionDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["poll_candidates"]>

  export type poll_candidatesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poll_id?: boolean
    user_id?: boolean
    invited_at?: boolean
    election?: boolean | electionDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["poll_candidates"]>

  export type poll_candidatesSelectScalar = {
    id?: boolean
    poll_id?: boolean
    user_id?: boolean
    invited_at?: boolean
  }

  export type poll_candidatesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "poll_id" | "user_id" | "invited_at", ExtArgs["result"]["poll_candidates"]>
  export type poll_candidatesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    election?: boolean | electionDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type poll_candidatesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    election?: boolean | electionDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type poll_candidatesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    election?: boolean | electionDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $poll_candidatesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "poll_candidates"
    objects: {
      election: Prisma.$electionPayload<ExtArgs>
      user: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      poll_id: number
      user_id: number
      invited_at: Date
    }, ExtArgs["result"]["poll_candidates"]>
    composites: {}
  }

  type poll_candidatesGetPayload<S extends boolean | null | undefined | poll_candidatesDefaultArgs> = $Result.GetResult<Prisma.$poll_candidatesPayload, S>

  type poll_candidatesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<poll_candidatesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Poll_candidatesCountAggregateInputType | true
    }

  export interface poll_candidatesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['poll_candidates'], meta: { name: 'poll_candidates' } }
    /**
     * Find zero or one Poll_candidates that matches the filter.
     * @param {poll_candidatesFindUniqueArgs} args - Arguments to find a Poll_candidates
     * @example
     * // Get one Poll_candidates
     * const poll_candidates = await prisma.poll_candidates.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends poll_candidatesFindUniqueArgs>(args: SelectSubset<T, poll_candidatesFindUniqueArgs<ExtArgs>>): Prisma__poll_candidatesClient<$Result.GetResult<Prisma.$poll_candidatesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Poll_candidates that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {poll_candidatesFindUniqueOrThrowArgs} args - Arguments to find a Poll_candidates
     * @example
     * // Get one Poll_candidates
     * const poll_candidates = await prisma.poll_candidates.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends poll_candidatesFindUniqueOrThrowArgs>(args: SelectSubset<T, poll_candidatesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__poll_candidatesClient<$Result.GetResult<Prisma.$poll_candidatesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Poll_candidates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poll_candidatesFindFirstArgs} args - Arguments to find a Poll_candidates
     * @example
     * // Get one Poll_candidates
     * const poll_candidates = await prisma.poll_candidates.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends poll_candidatesFindFirstArgs>(args?: SelectSubset<T, poll_candidatesFindFirstArgs<ExtArgs>>): Prisma__poll_candidatesClient<$Result.GetResult<Prisma.$poll_candidatesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Poll_candidates that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poll_candidatesFindFirstOrThrowArgs} args - Arguments to find a Poll_candidates
     * @example
     * // Get one Poll_candidates
     * const poll_candidates = await prisma.poll_candidates.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends poll_candidatesFindFirstOrThrowArgs>(args?: SelectSubset<T, poll_candidatesFindFirstOrThrowArgs<ExtArgs>>): Prisma__poll_candidatesClient<$Result.GetResult<Prisma.$poll_candidatesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Poll_candidates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poll_candidatesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Poll_candidates
     * const poll_candidates = await prisma.poll_candidates.findMany()
     * 
     * // Get first 10 Poll_candidates
     * const poll_candidates = await prisma.poll_candidates.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const poll_candidatesWithIdOnly = await prisma.poll_candidates.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends poll_candidatesFindManyArgs>(args?: SelectSubset<T, poll_candidatesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$poll_candidatesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Poll_candidates.
     * @param {poll_candidatesCreateArgs} args - Arguments to create a Poll_candidates.
     * @example
     * // Create one Poll_candidates
     * const Poll_candidates = await prisma.poll_candidates.create({
     *   data: {
     *     // ... data to create a Poll_candidates
     *   }
     * })
     * 
     */
    create<T extends poll_candidatesCreateArgs>(args: SelectSubset<T, poll_candidatesCreateArgs<ExtArgs>>): Prisma__poll_candidatesClient<$Result.GetResult<Prisma.$poll_candidatesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Poll_candidates.
     * @param {poll_candidatesCreateManyArgs} args - Arguments to create many Poll_candidates.
     * @example
     * // Create many Poll_candidates
     * const poll_candidates = await prisma.poll_candidates.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends poll_candidatesCreateManyArgs>(args?: SelectSubset<T, poll_candidatesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Poll_candidates and returns the data saved in the database.
     * @param {poll_candidatesCreateManyAndReturnArgs} args - Arguments to create many Poll_candidates.
     * @example
     * // Create many Poll_candidates
     * const poll_candidates = await prisma.poll_candidates.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Poll_candidates and only return the `id`
     * const poll_candidatesWithIdOnly = await prisma.poll_candidates.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends poll_candidatesCreateManyAndReturnArgs>(args?: SelectSubset<T, poll_candidatesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$poll_candidatesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Poll_candidates.
     * @param {poll_candidatesDeleteArgs} args - Arguments to delete one Poll_candidates.
     * @example
     * // Delete one Poll_candidates
     * const Poll_candidates = await prisma.poll_candidates.delete({
     *   where: {
     *     // ... filter to delete one Poll_candidates
     *   }
     * })
     * 
     */
    delete<T extends poll_candidatesDeleteArgs>(args: SelectSubset<T, poll_candidatesDeleteArgs<ExtArgs>>): Prisma__poll_candidatesClient<$Result.GetResult<Prisma.$poll_candidatesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Poll_candidates.
     * @param {poll_candidatesUpdateArgs} args - Arguments to update one Poll_candidates.
     * @example
     * // Update one Poll_candidates
     * const poll_candidates = await prisma.poll_candidates.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends poll_candidatesUpdateArgs>(args: SelectSubset<T, poll_candidatesUpdateArgs<ExtArgs>>): Prisma__poll_candidatesClient<$Result.GetResult<Prisma.$poll_candidatesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Poll_candidates.
     * @param {poll_candidatesDeleteManyArgs} args - Arguments to filter Poll_candidates to delete.
     * @example
     * // Delete a few Poll_candidates
     * const { count } = await prisma.poll_candidates.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends poll_candidatesDeleteManyArgs>(args?: SelectSubset<T, poll_candidatesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Poll_candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poll_candidatesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Poll_candidates
     * const poll_candidates = await prisma.poll_candidates.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends poll_candidatesUpdateManyArgs>(args: SelectSubset<T, poll_candidatesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Poll_candidates and returns the data updated in the database.
     * @param {poll_candidatesUpdateManyAndReturnArgs} args - Arguments to update many Poll_candidates.
     * @example
     * // Update many Poll_candidates
     * const poll_candidates = await prisma.poll_candidates.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Poll_candidates and only return the `id`
     * const poll_candidatesWithIdOnly = await prisma.poll_candidates.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends poll_candidatesUpdateManyAndReturnArgs>(args: SelectSubset<T, poll_candidatesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$poll_candidatesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Poll_candidates.
     * @param {poll_candidatesUpsertArgs} args - Arguments to update or create a Poll_candidates.
     * @example
     * // Update or create a Poll_candidates
     * const poll_candidates = await prisma.poll_candidates.upsert({
     *   create: {
     *     // ... data to create a Poll_candidates
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Poll_candidates we want to update
     *   }
     * })
     */
    upsert<T extends poll_candidatesUpsertArgs>(args: SelectSubset<T, poll_candidatesUpsertArgs<ExtArgs>>): Prisma__poll_candidatesClient<$Result.GetResult<Prisma.$poll_candidatesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Poll_candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poll_candidatesCountArgs} args - Arguments to filter Poll_candidates to count.
     * @example
     * // Count the number of Poll_candidates
     * const count = await prisma.poll_candidates.count({
     *   where: {
     *     // ... the filter for the Poll_candidates we want to count
     *   }
     * })
    **/
    count<T extends poll_candidatesCountArgs>(
      args?: Subset<T, poll_candidatesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Poll_candidatesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Poll_candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Poll_candidatesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Poll_candidatesAggregateArgs>(args: Subset<T, Poll_candidatesAggregateArgs>): Prisma.PrismaPromise<GetPoll_candidatesAggregateType<T>>

    /**
     * Group by Poll_candidates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poll_candidatesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends poll_candidatesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: poll_candidatesGroupByArgs['orderBy'] }
        : { orderBy?: poll_candidatesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, poll_candidatesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPoll_candidatesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the poll_candidates model
   */
  readonly fields: poll_candidatesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for poll_candidates.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__poll_candidatesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    election<T extends electionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, electionDefaultArgs<ExtArgs>>): Prisma__electionClient<$Result.GetResult<Prisma.$electionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the poll_candidates model
   */
  interface poll_candidatesFieldRefs {
    readonly id: FieldRef<"poll_candidates", 'Int'>
    readonly poll_id: FieldRef<"poll_candidates", 'Int'>
    readonly user_id: FieldRef<"poll_candidates", 'Int'>
    readonly invited_at: FieldRef<"poll_candidates", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * poll_candidates findUnique
   */
  export type poll_candidatesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poll_candidates
     */
    select?: poll_candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poll_candidates
     */
    omit?: poll_candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: poll_candidatesInclude<ExtArgs> | null
    /**
     * Filter, which poll_candidates to fetch.
     */
    where: poll_candidatesWhereUniqueInput
  }

  /**
   * poll_candidates findUniqueOrThrow
   */
  export type poll_candidatesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poll_candidates
     */
    select?: poll_candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poll_candidates
     */
    omit?: poll_candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: poll_candidatesInclude<ExtArgs> | null
    /**
     * Filter, which poll_candidates to fetch.
     */
    where: poll_candidatesWhereUniqueInput
  }

  /**
   * poll_candidates findFirst
   */
  export type poll_candidatesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poll_candidates
     */
    select?: poll_candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poll_candidates
     */
    omit?: poll_candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: poll_candidatesInclude<ExtArgs> | null
    /**
     * Filter, which poll_candidates to fetch.
     */
    where?: poll_candidatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of poll_candidates to fetch.
     */
    orderBy?: poll_candidatesOrderByWithRelationInput | poll_candidatesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for poll_candidates.
     */
    cursor?: poll_candidatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` poll_candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` poll_candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of poll_candidates.
     */
    distinct?: Poll_candidatesScalarFieldEnum | Poll_candidatesScalarFieldEnum[]
  }

  /**
   * poll_candidates findFirstOrThrow
   */
  export type poll_candidatesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poll_candidates
     */
    select?: poll_candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poll_candidates
     */
    omit?: poll_candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: poll_candidatesInclude<ExtArgs> | null
    /**
     * Filter, which poll_candidates to fetch.
     */
    where?: poll_candidatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of poll_candidates to fetch.
     */
    orderBy?: poll_candidatesOrderByWithRelationInput | poll_candidatesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for poll_candidates.
     */
    cursor?: poll_candidatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` poll_candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` poll_candidates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of poll_candidates.
     */
    distinct?: Poll_candidatesScalarFieldEnum | Poll_candidatesScalarFieldEnum[]
  }

  /**
   * poll_candidates findMany
   */
  export type poll_candidatesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poll_candidates
     */
    select?: poll_candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poll_candidates
     */
    omit?: poll_candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: poll_candidatesInclude<ExtArgs> | null
    /**
     * Filter, which poll_candidates to fetch.
     */
    where?: poll_candidatesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of poll_candidates to fetch.
     */
    orderBy?: poll_candidatesOrderByWithRelationInput | poll_candidatesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing poll_candidates.
     */
    cursor?: poll_candidatesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` poll_candidates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` poll_candidates.
     */
    skip?: number
    distinct?: Poll_candidatesScalarFieldEnum | Poll_candidatesScalarFieldEnum[]
  }

  /**
   * poll_candidates create
   */
  export type poll_candidatesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poll_candidates
     */
    select?: poll_candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poll_candidates
     */
    omit?: poll_candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: poll_candidatesInclude<ExtArgs> | null
    /**
     * The data needed to create a poll_candidates.
     */
    data: XOR<poll_candidatesCreateInput, poll_candidatesUncheckedCreateInput>
  }

  /**
   * poll_candidates createMany
   */
  export type poll_candidatesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many poll_candidates.
     */
    data: poll_candidatesCreateManyInput | poll_candidatesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * poll_candidates createManyAndReturn
   */
  export type poll_candidatesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poll_candidates
     */
    select?: poll_candidatesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the poll_candidates
     */
    omit?: poll_candidatesOmit<ExtArgs> | null
    /**
     * The data used to create many poll_candidates.
     */
    data: poll_candidatesCreateManyInput | poll_candidatesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: poll_candidatesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * poll_candidates update
   */
  export type poll_candidatesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poll_candidates
     */
    select?: poll_candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poll_candidates
     */
    omit?: poll_candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: poll_candidatesInclude<ExtArgs> | null
    /**
     * The data needed to update a poll_candidates.
     */
    data: XOR<poll_candidatesUpdateInput, poll_candidatesUncheckedUpdateInput>
    /**
     * Choose, which poll_candidates to update.
     */
    where: poll_candidatesWhereUniqueInput
  }

  /**
   * poll_candidates updateMany
   */
  export type poll_candidatesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update poll_candidates.
     */
    data: XOR<poll_candidatesUpdateManyMutationInput, poll_candidatesUncheckedUpdateManyInput>
    /**
     * Filter which poll_candidates to update
     */
    where?: poll_candidatesWhereInput
    /**
     * Limit how many poll_candidates to update.
     */
    limit?: number
  }

  /**
   * poll_candidates updateManyAndReturn
   */
  export type poll_candidatesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poll_candidates
     */
    select?: poll_candidatesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the poll_candidates
     */
    omit?: poll_candidatesOmit<ExtArgs> | null
    /**
     * The data used to update poll_candidates.
     */
    data: XOR<poll_candidatesUpdateManyMutationInput, poll_candidatesUncheckedUpdateManyInput>
    /**
     * Filter which poll_candidates to update
     */
    where?: poll_candidatesWhereInput
    /**
     * Limit how many poll_candidates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: poll_candidatesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * poll_candidates upsert
   */
  export type poll_candidatesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poll_candidates
     */
    select?: poll_candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poll_candidates
     */
    omit?: poll_candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: poll_candidatesInclude<ExtArgs> | null
    /**
     * The filter to search for the poll_candidates to update in case it exists.
     */
    where: poll_candidatesWhereUniqueInput
    /**
     * In case the poll_candidates found by the `where` argument doesn't exist, create a new poll_candidates with this data.
     */
    create: XOR<poll_candidatesCreateInput, poll_candidatesUncheckedCreateInput>
    /**
     * In case the poll_candidates was found with the provided `where` argument, update it with this data.
     */
    update: XOR<poll_candidatesUpdateInput, poll_candidatesUncheckedUpdateInput>
  }

  /**
   * poll_candidates delete
   */
  export type poll_candidatesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poll_candidates
     */
    select?: poll_candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poll_candidates
     */
    omit?: poll_candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: poll_candidatesInclude<ExtArgs> | null
    /**
     * Filter which poll_candidates to delete.
     */
    where: poll_candidatesWhereUniqueInput
  }

  /**
   * poll_candidates deleteMany
   */
  export type poll_candidatesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which poll_candidates to delete
     */
    where?: poll_candidatesWhereInput
    /**
     * Limit how many poll_candidates to delete.
     */
    limit?: number
  }

  /**
   * poll_candidates without action
   */
  export type poll_candidatesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poll_candidates
     */
    select?: poll_candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poll_candidates
     */
    omit?: poll_candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: poll_candidatesInclude<ExtArgs> | null
  }


  /**
   * Model takepart
   */

  export type AggregateTakepart = {
    _count: TakepartCountAggregateOutputType | null
    _avg: TakepartAvgAggregateOutputType | null
    _sum: TakepartSumAggregateOutputType | null
    _min: TakepartMinAggregateOutputType | null
    _max: TakepartMaxAggregateOutputType | null
  }

  export type TakepartAvgAggregateOutputType = {
    electionId: number | null
    candidateId: number | null
    numberOfVotes: number | null
  }

  export type TakepartSumAggregateOutputType = {
    electionId: number | null
    candidateId: number | null
    numberOfVotes: number | null
  }

  export type TakepartMinAggregateOutputType = {
    electionId: number | null
    candidateId: number | null
    numberOfVotes: number | null
  }

  export type TakepartMaxAggregateOutputType = {
    electionId: number | null
    candidateId: number | null
    numberOfVotes: number | null
  }

  export type TakepartCountAggregateOutputType = {
    electionId: number
    candidateId: number
    numberOfVotes: number
    _all: number
  }


  export type TakepartAvgAggregateInputType = {
    electionId?: true
    candidateId?: true
    numberOfVotes?: true
  }

  export type TakepartSumAggregateInputType = {
    electionId?: true
    candidateId?: true
    numberOfVotes?: true
  }

  export type TakepartMinAggregateInputType = {
    electionId?: true
    candidateId?: true
    numberOfVotes?: true
  }

  export type TakepartMaxAggregateInputType = {
    electionId?: true
    candidateId?: true
    numberOfVotes?: true
  }

  export type TakepartCountAggregateInputType = {
    electionId?: true
    candidateId?: true
    numberOfVotes?: true
    _all?: true
  }

  export type TakepartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which takepart to aggregate.
     */
    where?: takepartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of takeparts to fetch.
     */
    orderBy?: takepartOrderByWithRelationInput | takepartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: takepartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` takeparts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` takeparts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned takeparts
    **/
    _count?: true | TakepartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TakepartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TakepartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TakepartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TakepartMaxAggregateInputType
  }

  export type GetTakepartAggregateType<T extends TakepartAggregateArgs> = {
        [P in keyof T & keyof AggregateTakepart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTakepart[P]>
      : GetScalarType<T[P], AggregateTakepart[P]>
  }




  export type takepartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: takepartWhereInput
    orderBy?: takepartOrderByWithAggregationInput | takepartOrderByWithAggregationInput[]
    by: TakepartScalarFieldEnum[] | TakepartScalarFieldEnum
    having?: takepartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TakepartCountAggregateInputType | true
    _avg?: TakepartAvgAggregateInputType
    _sum?: TakepartSumAggregateInputType
    _min?: TakepartMinAggregateInputType
    _max?: TakepartMaxAggregateInputType
  }

  export type TakepartGroupByOutputType = {
    electionId: number
    candidateId: number
    numberOfVotes: number
    _count: TakepartCountAggregateOutputType | null
    _avg: TakepartAvgAggregateOutputType | null
    _sum: TakepartSumAggregateOutputType | null
    _min: TakepartMinAggregateOutputType | null
    _max: TakepartMaxAggregateOutputType | null
  }

  type GetTakepartGroupByPayload<T extends takepartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TakepartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TakepartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TakepartGroupByOutputType[P]>
            : GetScalarType<T[P], TakepartGroupByOutputType[P]>
        }
      >
    >


  export type takepartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    electionId?: boolean
    candidateId?: boolean
    numberOfVotes?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    election?: boolean | electionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["takepart"]>

  export type takepartSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    electionId?: boolean
    candidateId?: boolean
    numberOfVotes?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    election?: boolean | electionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["takepart"]>

  export type takepartSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    electionId?: boolean
    candidateId?: boolean
    numberOfVotes?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    election?: boolean | electionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["takepart"]>

  export type takepartSelectScalar = {
    electionId?: boolean
    candidateId?: boolean
    numberOfVotes?: boolean
  }

  export type takepartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"electionId" | "candidateId" | "numberOfVotes", ExtArgs["result"]["takepart"]>
  export type takepartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    election?: boolean | electionDefaultArgs<ExtArgs>
  }
  export type takepartIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    election?: boolean | electionDefaultArgs<ExtArgs>
  }
  export type takepartIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    election?: boolean | electionDefaultArgs<ExtArgs>
  }

  export type $takepartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "takepart"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
      election: Prisma.$electionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      electionId: number
      candidateId: number
      numberOfVotes: number
    }, ExtArgs["result"]["takepart"]>
    composites: {}
  }

  type takepartGetPayload<S extends boolean | null | undefined | takepartDefaultArgs> = $Result.GetResult<Prisma.$takepartPayload, S>

  type takepartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<takepartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TakepartCountAggregateInputType | true
    }

  export interface takepartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['takepart'], meta: { name: 'takepart' } }
    /**
     * Find zero or one Takepart that matches the filter.
     * @param {takepartFindUniqueArgs} args - Arguments to find a Takepart
     * @example
     * // Get one Takepart
     * const takepart = await prisma.takepart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends takepartFindUniqueArgs>(args: SelectSubset<T, takepartFindUniqueArgs<ExtArgs>>): Prisma__takepartClient<$Result.GetResult<Prisma.$takepartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Takepart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {takepartFindUniqueOrThrowArgs} args - Arguments to find a Takepart
     * @example
     * // Get one Takepart
     * const takepart = await prisma.takepart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends takepartFindUniqueOrThrowArgs>(args: SelectSubset<T, takepartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__takepartClient<$Result.GetResult<Prisma.$takepartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Takepart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {takepartFindFirstArgs} args - Arguments to find a Takepart
     * @example
     * // Get one Takepart
     * const takepart = await prisma.takepart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends takepartFindFirstArgs>(args?: SelectSubset<T, takepartFindFirstArgs<ExtArgs>>): Prisma__takepartClient<$Result.GetResult<Prisma.$takepartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Takepart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {takepartFindFirstOrThrowArgs} args - Arguments to find a Takepart
     * @example
     * // Get one Takepart
     * const takepart = await prisma.takepart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends takepartFindFirstOrThrowArgs>(args?: SelectSubset<T, takepartFindFirstOrThrowArgs<ExtArgs>>): Prisma__takepartClient<$Result.GetResult<Prisma.$takepartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Takeparts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {takepartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Takeparts
     * const takeparts = await prisma.takepart.findMany()
     * 
     * // Get first 10 Takeparts
     * const takeparts = await prisma.takepart.findMany({ take: 10 })
     * 
     * // Only select the `electionId`
     * const takepartWithElectionIdOnly = await prisma.takepart.findMany({ select: { electionId: true } })
     * 
     */
    findMany<T extends takepartFindManyArgs>(args?: SelectSubset<T, takepartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$takepartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Takepart.
     * @param {takepartCreateArgs} args - Arguments to create a Takepart.
     * @example
     * // Create one Takepart
     * const Takepart = await prisma.takepart.create({
     *   data: {
     *     // ... data to create a Takepart
     *   }
     * })
     * 
     */
    create<T extends takepartCreateArgs>(args: SelectSubset<T, takepartCreateArgs<ExtArgs>>): Prisma__takepartClient<$Result.GetResult<Prisma.$takepartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Takeparts.
     * @param {takepartCreateManyArgs} args - Arguments to create many Takeparts.
     * @example
     * // Create many Takeparts
     * const takepart = await prisma.takepart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends takepartCreateManyArgs>(args?: SelectSubset<T, takepartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Takeparts and returns the data saved in the database.
     * @param {takepartCreateManyAndReturnArgs} args - Arguments to create many Takeparts.
     * @example
     * // Create many Takeparts
     * const takepart = await prisma.takepart.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Takeparts and only return the `electionId`
     * const takepartWithElectionIdOnly = await prisma.takepart.createManyAndReturn({
     *   select: { electionId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends takepartCreateManyAndReturnArgs>(args?: SelectSubset<T, takepartCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$takepartPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Takepart.
     * @param {takepartDeleteArgs} args - Arguments to delete one Takepart.
     * @example
     * // Delete one Takepart
     * const Takepart = await prisma.takepart.delete({
     *   where: {
     *     // ... filter to delete one Takepart
     *   }
     * })
     * 
     */
    delete<T extends takepartDeleteArgs>(args: SelectSubset<T, takepartDeleteArgs<ExtArgs>>): Prisma__takepartClient<$Result.GetResult<Prisma.$takepartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Takepart.
     * @param {takepartUpdateArgs} args - Arguments to update one Takepart.
     * @example
     * // Update one Takepart
     * const takepart = await prisma.takepart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends takepartUpdateArgs>(args: SelectSubset<T, takepartUpdateArgs<ExtArgs>>): Prisma__takepartClient<$Result.GetResult<Prisma.$takepartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Takeparts.
     * @param {takepartDeleteManyArgs} args - Arguments to filter Takeparts to delete.
     * @example
     * // Delete a few Takeparts
     * const { count } = await prisma.takepart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends takepartDeleteManyArgs>(args?: SelectSubset<T, takepartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Takeparts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {takepartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Takeparts
     * const takepart = await prisma.takepart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends takepartUpdateManyArgs>(args: SelectSubset<T, takepartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Takeparts and returns the data updated in the database.
     * @param {takepartUpdateManyAndReturnArgs} args - Arguments to update many Takeparts.
     * @example
     * // Update many Takeparts
     * const takepart = await prisma.takepart.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Takeparts and only return the `electionId`
     * const takepartWithElectionIdOnly = await prisma.takepart.updateManyAndReturn({
     *   select: { electionId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends takepartUpdateManyAndReturnArgs>(args: SelectSubset<T, takepartUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$takepartPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Takepart.
     * @param {takepartUpsertArgs} args - Arguments to update or create a Takepart.
     * @example
     * // Update or create a Takepart
     * const takepart = await prisma.takepart.upsert({
     *   create: {
     *     // ... data to create a Takepart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Takepart we want to update
     *   }
     * })
     */
    upsert<T extends takepartUpsertArgs>(args: SelectSubset<T, takepartUpsertArgs<ExtArgs>>): Prisma__takepartClient<$Result.GetResult<Prisma.$takepartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Takeparts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {takepartCountArgs} args - Arguments to filter Takeparts to count.
     * @example
     * // Count the number of Takeparts
     * const count = await prisma.takepart.count({
     *   where: {
     *     // ... the filter for the Takeparts we want to count
     *   }
     * })
    **/
    count<T extends takepartCountArgs>(
      args?: Subset<T, takepartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TakepartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Takepart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TakepartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TakepartAggregateArgs>(args: Subset<T, TakepartAggregateArgs>): Prisma.PrismaPromise<GetTakepartAggregateType<T>>

    /**
     * Group by Takepart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {takepartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends takepartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: takepartGroupByArgs['orderBy'] }
        : { orderBy?: takepartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, takepartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTakepartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the takepart model
   */
  readonly fields: takepartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for takepart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__takepartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    election<T extends electionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, electionDefaultArgs<ExtArgs>>): Prisma__electionClient<$Result.GetResult<Prisma.$electionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the takepart model
   */
  interface takepartFieldRefs {
    readonly electionId: FieldRef<"takepart", 'Int'>
    readonly candidateId: FieldRef<"takepart", 'Int'>
    readonly numberOfVotes: FieldRef<"takepart", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * takepart findUnique
   */
  export type takepartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the takepart
     */
    select?: takepartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the takepart
     */
    omit?: takepartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: takepartInclude<ExtArgs> | null
    /**
     * Filter, which takepart to fetch.
     */
    where: takepartWhereUniqueInput
  }

  /**
   * takepart findUniqueOrThrow
   */
  export type takepartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the takepart
     */
    select?: takepartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the takepart
     */
    omit?: takepartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: takepartInclude<ExtArgs> | null
    /**
     * Filter, which takepart to fetch.
     */
    where: takepartWhereUniqueInput
  }

  /**
   * takepart findFirst
   */
  export type takepartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the takepart
     */
    select?: takepartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the takepart
     */
    omit?: takepartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: takepartInclude<ExtArgs> | null
    /**
     * Filter, which takepart to fetch.
     */
    where?: takepartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of takeparts to fetch.
     */
    orderBy?: takepartOrderByWithRelationInput | takepartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for takeparts.
     */
    cursor?: takepartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` takeparts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` takeparts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of takeparts.
     */
    distinct?: TakepartScalarFieldEnum | TakepartScalarFieldEnum[]
  }

  /**
   * takepart findFirstOrThrow
   */
  export type takepartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the takepart
     */
    select?: takepartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the takepart
     */
    omit?: takepartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: takepartInclude<ExtArgs> | null
    /**
     * Filter, which takepart to fetch.
     */
    where?: takepartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of takeparts to fetch.
     */
    orderBy?: takepartOrderByWithRelationInput | takepartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for takeparts.
     */
    cursor?: takepartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` takeparts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` takeparts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of takeparts.
     */
    distinct?: TakepartScalarFieldEnum | TakepartScalarFieldEnum[]
  }

  /**
   * takepart findMany
   */
  export type takepartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the takepart
     */
    select?: takepartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the takepart
     */
    omit?: takepartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: takepartInclude<ExtArgs> | null
    /**
     * Filter, which takeparts to fetch.
     */
    where?: takepartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of takeparts to fetch.
     */
    orderBy?: takepartOrderByWithRelationInput | takepartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing takeparts.
     */
    cursor?: takepartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` takeparts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` takeparts.
     */
    skip?: number
    distinct?: TakepartScalarFieldEnum | TakepartScalarFieldEnum[]
  }

  /**
   * takepart create
   */
  export type takepartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the takepart
     */
    select?: takepartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the takepart
     */
    omit?: takepartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: takepartInclude<ExtArgs> | null
    /**
     * The data needed to create a takepart.
     */
    data: XOR<takepartCreateInput, takepartUncheckedCreateInput>
  }

  /**
   * takepart createMany
   */
  export type takepartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many takeparts.
     */
    data: takepartCreateManyInput | takepartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * takepart createManyAndReturn
   */
  export type takepartCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the takepart
     */
    select?: takepartSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the takepart
     */
    omit?: takepartOmit<ExtArgs> | null
    /**
     * The data used to create many takeparts.
     */
    data: takepartCreateManyInput | takepartCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: takepartIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * takepart update
   */
  export type takepartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the takepart
     */
    select?: takepartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the takepart
     */
    omit?: takepartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: takepartInclude<ExtArgs> | null
    /**
     * The data needed to update a takepart.
     */
    data: XOR<takepartUpdateInput, takepartUncheckedUpdateInput>
    /**
     * Choose, which takepart to update.
     */
    where: takepartWhereUniqueInput
  }

  /**
   * takepart updateMany
   */
  export type takepartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update takeparts.
     */
    data: XOR<takepartUpdateManyMutationInput, takepartUncheckedUpdateManyInput>
    /**
     * Filter which takeparts to update
     */
    where?: takepartWhereInput
    /**
     * Limit how many takeparts to update.
     */
    limit?: number
  }

  /**
   * takepart updateManyAndReturn
   */
  export type takepartUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the takepart
     */
    select?: takepartSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the takepart
     */
    omit?: takepartOmit<ExtArgs> | null
    /**
     * The data used to update takeparts.
     */
    data: XOR<takepartUpdateManyMutationInput, takepartUncheckedUpdateManyInput>
    /**
     * Filter which takeparts to update
     */
    where?: takepartWhereInput
    /**
     * Limit how many takeparts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: takepartIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * takepart upsert
   */
  export type takepartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the takepart
     */
    select?: takepartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the takepart
     */
    omit?: takepartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: takepartInclude<ExtArgs> | null
    /**
     * The filter to search for the takepart to update in case it exists.
     */
    where: takepartWhereUniqueInput
    /**
     * In case the takepart found by the `where` argument doesn't exist, create a new takepart with this data.
     */
    create: XOR<takepartCreateInput, takepartUncheckedCreateInput>
    /**
     * In case the takepart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<takepartUpdateInput, takepartUncheckedUpdateInput>
  }

  /**
   * takepart delete
   */
  export type takepartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the takepart
     */
    select?: takepartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the takepart
     */
    omit?: takepartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: takepartInclude<ExtArgs> | null
    /**
     * Filter which takepart to delete.
     */
    where: takepartWhereUniqueInput
  }

  /**
   * takepart deleteMany
   */
  export type takepartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which takeparts to delete
     */
    where?: takepartWhereInput
    /**
     * Limit how many takeparts to delete.
     */
    limit?: number
  }

  /**
   * takepart without action
   */
  export type takepartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the takepart
     */
    select?: takepartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the takepart
     */
    omit?: takepartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: takepartInclude<ExtArgs> | null
  }


  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    clerkId: string | null
    fullName: string | null
    username: string | null
    password: string | null
    isAdmin: boolean | null
    gender: string | null
    email: string | null
    birthdate: Date | null
    occupation: string | null
    location: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    clerkId: string | null
    fullName: string | null
    username: string | null
    password: string | null
    isAdmin: boolean | null
    gender: string | null
    email: string | null
    birthdate: Date | null
    occupation: string | null
    location: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    clerkId: number
    fullName: number
    username: number
    password: number
    isAdmin: number
    gender: number
    email: number
    birthdate: number
    occupation: number
    location: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    clerkId?: true
    fullName?: true
    username?: true
    password?: true
    isAdmin?: true
    gender?: true
    email?: true
    birthdate?: true
    occupation?: true
    location?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    clerkId?: true
    fullName?: true
    username?: true
    password?: true
    isAdmin?: true
    gender?: true
    email?: true
    birthdate?: true
    occupation?: true
    location?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    clerkId?: true
    fullName?: true
    username?: true
    password?: true
    isAdmin?: true
    gender?: true
    email?: true
    birthdate?: true
    occupation?: true
    location?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    clerkId: string
    fullName: string
    username: string
    password: string
    isAdmin: boolean
    gender: string | null
    email: string
    birthdate: Date | null
    occupation: string | null
    location: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    fullName?: boolean
    username?: boolean
    password?: boolean
    isAdmin?: boolean
    gender?: boolean
    email?: boolean
    birthdate?: boolean
    occupation?: boolean
    location?: boolean
    election?: boolean | user$electionArgs<ExtArgs>
    poll_candidates?: boolean | user$poll_candidatesArgs<ExtArgs>
    takepart?: boolean | user$takepartArgs<ExtArgs>
    votes?: boolean | user$votesArgs<ExtArgs>
    candidateVotes?: boolean | user$candidateVotesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type userSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    fullName?: boolean
    username?: boolean
    password?: boolean
    isAdmin?: boolean
    gender?: boolean
    email?: boolean
    birthdate?: boolean
    occupation?: boolean
    location?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    fullName?: boolean
    username?: boolean
    password?: boolean
    isAdmin?: boolean
    gender?: boolean
    email?: boolean
    birthdate?: boolean
    occupation?: boolean
    location?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectScalar = {
    id?: boolean
    clerkId?: boolean
    fullName?: boolean
    username?: boolean
    password?: boolean
    isAdmin?: boolean
    gender?: boolean
    email?: boolean
    birthdate?: boolean
    occupation?: boolean
    location?: boolean
  }

  export type userOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clerkId" | "fullName" | "username" | "password" | "isAdmin" | "gender" | "email" | "birthdate" | "occupation" | "location", ExtArgs["result"]["user"]>
  export type userInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    election?: boolean | user$electionArgs<ExtArgs>
    poll_candidates?: boolean | user$poll_candidatesArgs<ExtArgs>
    takepart?: boolean | user$takepartArgs<ExtArgs>
    votes?: boolean | user$votesArgs<ExtArgs>
    candidateVotes?: boolean | user$candidateVotesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type userIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type userIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {
      election: Prisma.$electionPayload<ExtArgs>[]
      poll_candidates: Prisma.$poll_candidatesPayload<ExtArgs>[]
      takepart: Prisma.$takepartPayload<ExtArgs>[]
      votes: Prisma.$VotePayload<ExtArgs>[]
      candidateVotes: Prisma.$VotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      clerkId: string
      fullName: string
      username: string
      password: string
      isAdmin: boolean
      gender: string | null
      email: string
      birthdate: Date | null
      occupation: string | null
      location: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {userCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends userCreateManyAndReturnArgs>(args?: SelectSubset<T, userCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {userUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends userUpdateManyAndReturnArgs>(args: SelectSubset<T, userUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    election<T extends user$electionArgs<ExtArgs> = {}>(args?: Subset<T, user$electionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$electionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    poll_candidates<T extends user$poll_candidatesArgs<ExtArgs> = {}>(args?: Subset<T, user$poll_candidatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$poll_candidatesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    takepart<T extends user$takepartArgs<ExtArgs> = {}>(args?: Subset<T, user$takepartArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$takepartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    votes<T extends user$votesArgs<ExtArgs> = {}>(args?: Subset<T, user$votesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    candidateVotes<T extends user$candidateVotesArgs<ExtArgs> = {}>(args?: Subset<T, user$candidateVotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user model
   */
  interface userFieldRefs {
    readonly id: FieldRef<"user", 'Int'>
    readonly clerkId: FieldRef<"user", 'String'>
    readonly fullName: FieldRef<"user", 'String'>
    readonly username: FieldRef<"user", 'String'>
    readonly password: FieldRef<"user", 'String'>
    readonly isAdmin: FieldRef<"user", 'Boolean'>
    readonly gender: FieldRef<"user", 'String'>
    readonly email: FieldRef<"user", 'String'>
    readonly birthdate: FieldRef<"user", 'DateTime'>
    readonly occupation: FieldRef<"user", 'String'>
    readonly location: FieldRef<"user", 'String'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user createManyAndReturn
   */
  export type userCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user updateManyAndReturn
   */
  export type userUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * user.election
   */
  export type user$electionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the election
     */
    select?: electionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the election
     */
    omit?: electionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: electionInclude<ExtArgs> | null
    where?: electionWhereInput
    orderBy?: electionOrderByWithRelationInput | electionOrderByWithRelationInput[]
    cursor?: electionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ElectionScalarFieldEnum | ElectionScalarFieldEnum[]
  }

  /**
   * user.poll_candidates
   */
  export type user$poll_candidatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poll_candidates
     */
    select?: poll_candidatesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poll_candidates
     */
    omit?: poll_candidatesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: poll_candidatesInclude<ExtArgs> | null
    where?: poll_candidatesWhereInput
    orderBy?: poll_candidatesOrderByWithRelationInput | poll_candidatesOrderByWithRelationInput[]
    cursor?: poll_candidatesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Poll_candidatesScalarFieldEnum | Poll_candidatesScalarFieldEnum[]
  }

  /**
   * user.takepart
   */
  export type user$takepartArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the takepart
     */
    select?: takepartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the takepart
     */
    omit?: takepartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: takepartInclude<ExtArgs> | null
    where?: takepartWhereInput
    orderBy?: takepartOrderByWithRelationInput | takepartOrderByWithRelationInput[]
    cursor?: takepartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TakepartScalarFieldEnum | TakepartScalarFieldEnum[]
  }

  /**
   * user.votes
   */
  export type user$votesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    cursor?: VoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * user.candidateVotes
   */
  export type user$candidateVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    cursor?: VoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
  }


  /**
   * Model Vote
   */

  export type AggregateVote = {
    _count: VoteCountAggregateOutputType | null
    _avg: VoteAvgAggregateOutputType | null
    _sum: VoteSumAggregateOutputType | null
    _min: VoteMinAggregateOutputType | null
    _max: VoteMaxAggregateOutputType | null
  }

  export type VoteAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    electionId: number | null
    candidateId: number | null
  }

  export type VoteSumAggregateOutputType = {
    id: number | null
    userId: number | null
    electionId: number | null
    candidateId: number | null
  }

  export type VoteMinAggregateOutputType = {
    id: number | null
    userId: number | null
    electionId: number | null
    candidateId: number | null
    votedAt: Date | null
  }

  export type VoteMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    electionId: number | null
    candidateId: number | null
    votedAt: Date | null
  }

  export type VoteCountAggregateOutputType = {
    id: number
    userId: number
    electionId: number
    candidateId: number
    votedAt: number
    _all: number
  }


  export type VoteAvgAggregateInputType = {
    id?: true
    userId?: true
    electionId?: true
    candidateId?: true
  }

  export type VoteSumAggregateInputType = {
    id?: true
    userId?: true
    electionId?: true
    candidateId?: true
  }

  export type VoteMinAggregateInputType = {
    id?: true
    userId?: true
    electionId?: true
    candidateId?: true
    votedAt?: true
  }

  export type VoteMaxAggregateInputType = {
    id?: true
    userId?: true
    electionId?: true
    candidateId?: true
    votedAt?: true
  }

  export type VoteCountAggregateInputType = {
    id?: true
    userId?: true
    electionId?: true
    candidateId?: true
    votedAt?: true
    _all?: true
  }

  export type VoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vote to aggregate.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Votes
    **/
    _count?: true | VoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VoteMaxAggregateInputType
  }

  export type GetVoteAggregateType<T extends VoteAggregateArgs> = {
        [P in keyof T & keyof AggregateVote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVote[P]>
      : GetScalarType<T[P], AggregateVote[P]>
  }




  export type VoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithAggregationInput | VoteOrderByWithAggregationInput[]
    by: VoteScalarFieldEnum[] | VoteScalarFieldEnum
    having?: VoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VoteCountAggregateInputType | true
    _avg?: VoteAvgAggregateInputType
    _sum?: VoteSumAggregateInputType
    _min?: VoteMinAggregateInputType
    _max?: VoteMaxAggregateInputType
  }

  export type VoteGroupByOutputType = {
    id: number
    userId: number
    electionId: number
    candidateId: number
    votedAt: Date
    _count: VoteCountAggregateOutputType | null
    _avg: VoteAvgAggregateOutputType | null
    _sum: VoteSumAggregateOutputType | null
    _min: VoteMinAggregateOutputType | null
    _max: VoteMaxAggregateOutputType | null
  }

  type GetVoteGroupByPayload<T extends VoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VoteGroupByOutputType[P]>
            : GetScalarType<T[P], VoteGroupByOutputType[P]>
        }
      >
    >


  export type VoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    electionId?: boolean
    candidateId?: boolean
    votedAt?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    election?: boolean | electionDefaultArgs<ExtArgs>
    candidate?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vote"]>

  export type VoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    electionId?: boolean
    candidateId?: boolean
    votedAt?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    election?: boolean | electionDefaultArgs<ExtArgs>
    candidate?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vote"]>

  export type VoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    electionId?: boolean
    candidateId?: boolean
    votedAt?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    election?: boolean | electionDefaultArgs<ExtArgs>
    candidate?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vote"]>

  export type VoteSelectScalar = {
    id?: boolean
    userId?: boolean
    electionId?: boolean
    candidateId?: boolean
    votedAt?: boolean
  }

  export type VoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "electionId" | "candidateId" | "votedAt", ExtArgs["result"]["vote"]>
  export type VoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    election?: boolean | electionDefaultArgs<ExtArgs>
    candidate?: boolean | userDefaultArgs<ExtArgs>
  }
  export type VoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    election?: boolean | electionDefaultArgs<ExtArgs>
    candidate?: boolean | userDefaultArgs<ExtArgs>
  }
  export type VoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    election?: boolean | electionDefaultArgs<ExtArgs>
    candidate?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $VotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vote"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
      election: Prisma.$electionPayload<ExtArgs>
      candidate: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      electionId: number
      candidateId: number
      votedAt: Date
    }, ExtArgs["result"]["vote"]>
    composites: {}
  }

  type VoteGetPayload<S extends boolean | null | undefined | VoteDefaultArgs> = $Result.GetResult<Prisma.$VotePayload, S>

  type VoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VoteCountAggregateInputType | true
    }

  export interface VoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vote'], meta: { name: 'Vote' } }
    /**
     * Find zero or one Vote that matches the filter.
     * @param {VoteFindUniqueArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoteFindUniqueArgs>(args: SelectSubset<T, VoteFindUniqueArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VoteFindUniqueOrThrowArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoteFindUniqueOrThrowArgs>(args: SelectSubset<T, VoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindFirstArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoteFindFirstArgs>(args?: SelectSubset<T, VoteFindFirstArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindFirstOrThrowArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoteFindFirstOrThrowArgs>(args?: SelectSubset<T, VoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Votes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Votes
     * const votes = await prisma.vote.findMany()
     * 
     * // Get first 10 Votes
     * const votes = await prisma.vote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voteWithIdOnly = await prisma.vote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VoteFindManyArgs>(args?: SelectSubset<T, VoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vote.
     * @param {VoteCreateArgs} args - Arguments to create a Vote.
     * @example
     * // Create one Vote
     * const Vote = await prisma.vote.create({
     *   data: {
     *     // ... data to create a Vote
     *   }
     * })
     * 
     */
    create<T extends VoteCreateArgs>(args: SelectSubset<T, VoteCreateArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Votes.
     * @param {VoteCreateManyArgs} args - Arguments to create many Votes.
     * @example
     * // Create many Votes
     * const vote = await prisma.vote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VoteCreateManyArgs>(args?: SelectSubset<T, VoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Votes and returns the data saved in the database.
     * @param {VoteCreateManyAndReturnArgs} args - Arguments to create many Votes.
     * @example
     * // Create many Votes
     * const vote = await prisma.vote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Votes and only return the `id`
     * const voteWithIdOnly = await prisma.vote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VoteCreateManyAndReturnArgs>(args?: SelectSubset<T, VoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vote.
     * @param {VoteDeleteArgs} args - Arguments to delete one Vote.
     * @example
     * // Delete one Vote
     * const Vote = await prisma.vote.delete({
     *   where: {
     *     // ... filter to delete one Vote
     *   }
     * })
     * 
     */
    delete<T extends VoteDeleteArgs>(args: SelectSubset<T, VoteDeleteArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vote.
     * @param {VoteUpdateArgs} args - Arguments to update one Vote.
     * @example
     * // Update one Vote
     * const vote = await prisma.vote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VoteUpdateArgs>(args: SelectSubset<T, VoteUpdateArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Votes.
     * @param {VoteDeleteManyArgs} args - Arguments to filter Votes to delete.
     * @example
     * // Delete a few Votes
     * const { count } = await prisma.vote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VoteDeleteManyArgs>(args?: SelectSubset<T, VoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Votes
     * const vote = await prisma.vote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VoteUpdateManyArgs>(args: SelectSubset<T, VoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Votes and returns the data updated in the database.
     * @param {VoteUpdateManyAndReturnArgs} args - Arguments to update many Votes.
     * @example
     * // Update many Votes
     * const vote = await prisma.vote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Votes and only return the `id`
     * const voteWithIdOnly = await prisma.vote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VoteUpdateManyAndReturnArgs>(args: SelectSubset<T, VoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vote.
     * @param {VoteUpsertArgs} args - Arguments to update or create a Vote.
     * @example
     * // Update or create a Vote
     * const vote = await prisma.vote.upsert({
     *   create: {
     *     // ... data to create a Vote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vote we want to update
     *   }
     * })
     */
    upsert<T extends VoteUpsertArgs>(args: SelectSubset<T, VoteUpsertArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteCountArgs} args - Arguments to filter Votes to count.
     * @example
     * // Count the number of Votes
     * const count = await prisma.vote.count({
     *   where: {
     *     // ... the filter for the Votes we want to count
     *   }
     * })
    **/
    count<T extends VoteCountArgs>(
      args?: Subset<T, VoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VoteAggregateArgs>(args: Subset<T, VoteAggregateArgs>): Prisma.PrismaPromise<GetVoteAggregateType<T>>

    /**
     * Group by Vote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoteGroupByArgs['orderBy'] }
        : { orderBy?: VoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vote model
   */
  readonly fields: VoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    election<T extends electionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, electionDefaultArgs<ExtArgs>>): Prisma__electionClient<$Result.GetResult<Prisma.$electionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    candidate<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vote model
   */
  interface VoteFieldRefs {
    readonly id: FieldRef<"Vote", 'Int'>
    readonly userId: FieldRef<"Vote", 'Int'>
    readonly electionId: FieldRef<"Vote", 'Int'>
    readonly candidateId: FieldRef<"Vote", 'Int'>
    readonly votedAt: FieldRef<"Vote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vote findUnique
   */
  export type VoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote findUniqueOrThrow
   */
  export type VoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote findFirst
   */
  export type VoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Votes.
     */
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote findFirstOrThrow
   */
  export type VoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Votes.
     */
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote findMany
   */
  export type VoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Votes to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote create
   */
  export type VoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Vote.
     */
    data: XOR<VoteCreateInput, VoteUncheckedCreateInput>
  }

  /**
   * Vote createMany
   */
  export type VoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Votes.
     */
    data: VoteCreateManyInput | VoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vote createManyAndReturn
   */
  export type VoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * The data used to create many Votes.
     */
    data: VoteCreateManyInput | VoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vote update
   */
  export type VoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Vote.
     */
    data: XOR<VoteUpdateInput, VoteUncheckedUpdateInput>
    /**
     * Choose, which Vote to update.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote updateMany
   */
  export type VoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Votes.
     */
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyInput>
    /**
     * Filter which Votes to update
     */
    where?: VoteWhereInput
    /**
     * Limit how many Votes to update.
     */
    limit?: number
  }

  /**
   * Vote updateManyAndReturn
   */
  export type VoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * The data used to update Votes.
     */
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyInput>
    /**
     * Filter which Votes to update
     */
    where?: VoteWhereInput
    /**
     * Limit how many Votes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vote upsert
   */
  export type VoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Vote to update in case it exists.
     */
    where: VoteWhereUniqueInput
    /**
     * In case the Vote found by the `where` argument doesn't exist, create a new Vote with this data.
     */
    create: XOR<VoteCreateInput, VoteUncheckedCreateInput>
    /**
     * In case the Vote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoteUpdateInput, VoteUncheckedUpdateInput>
  }

  /**
   * Vote delete
   */
  export type VoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter which Vote to delete.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote deleteMany
   */
  export type VoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Votes to delete
     */
    where?: VoteWhereInput
    /**
     * Limit how many Votes to delete.
     */
    limit?: number
  }

  /**
   * Vote without action
   */
  export type VoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vote
     */
    omit?: VoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ElectionScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    start_date: 'start_date',
    end_date: 'end_date',
    is_active: 'is_active',
    target_occupation: 'target_occupation',
    target_location: 'target_location',
    birthdate_min: 'birthdate_min',
    birthdate_max: 'birthdate_max',
    target_gender: 'target_gender',
    userId: 'userId'
  };

  export type ElectionScalarFieldEnum = (typeof ElectionScalarFieldEnum)[keyof typeof ElectionScalarFieldEnum]


  export const Poll_candidatesScalarFieldEnum: {
    id: 'id',
    poll_id: 'poll_id',
    user_id: 'user_id',
    invited_at: 'invited_at'
  };

  export type Poll_candidatesScalarFieldEnum = (typeof Poll_candidatesScalarFieldEnum)[keyof typeof Poll_candidatesScalarFieldEnum]


  export const TakepartScalarFieldEnum: {
    electionId: 'electionId',
    candidateId: 'candidateId',
    numberOfVotes: 'numberOfVotes'
  };

  export type TakepartScalarFieldEnum = (typeof TakepartScalarFieldEnum)[keyof typeof TakepartScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    clerkId: 'clerkId',
    fullName: 'fullName',
    username: 'username',
    password: 'password',
    isAdmin: 'isAdmin',
    gender: 'gender',
    email: 'email',
    birthdate: 'birthdate',
    occupation: 'occupation',
    location: 'location'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VoteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    electionId: 'electionId',
    candidateId: 'candidateId',
    votedAt: 'votedAt'
  };

  export type VoteScalarFieldEnum = (typeof VoteScalarFieldEnum)[keyof typeof VoteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type electionWhereInput = {
    AND?: electionWhereInput | electionWhereInput[]
    OR?: electionWhereInput[]
    NOT?: electionWhereInput | electionWhereInput[]
    id?: IntFilter<"election"> | number
    title?: StringFilter<"election"> | string
    description?: StringNullableFilter<"election"> | string | null
    start_date?: DateTimeFilter<"election"> | Date | string
    end_date?: DateTimeFilter<"election"> | Date | string
    is_active?: BoolFilter<"election"> | boolean
    target_occupation?: StringNullableFilter<"election"> | string | null
    target_location?: StringNullableFilter<"election"> | string | null
    birthdate_min?: DateTimeNullableFilter<"election"> | Date | string | null
    birthdate_max?: DateTimeNullableFilter<"election"> | Date | string | null
    target_gender?: StringNullableFilter<"election"> | string | null
    userId?: IntFilter<"election"> | number
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    poll_candidates?: Poll_candidatesListRelationFilter
    takepart?: TakepartListRelationFilter
    votes?: VoteListRelationFilter
  }

  export type electionOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    is_active?: SortOrder
    target_occupation?: SortOrderInput | SortOrder
    target_location?: SortOrderInput | SortOrder
    birthdate_min?: SortOrderInput | SortOrder
    birthdate_max?: SortOrderInput | SortOrder
    target_gender?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: userOrderByWithRelationInput
    poll_candidates?: poll_candidatesOrderByRelationAggregateInput
    takepart?: takepartOrderByRelationAggregateInput
    votes?: VoteOrderByRelationAggregateInput
  }

  export type electionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: electionWhereInput | electionWhereInput[]
    OR?: electionWhereInput[]
    NOT?: electionWhereInput | electionWhereInput[]
    title?: StringFilter<"election"> | string
    description?: StringNullableFilter<"election"> | string | null
    start_date?: DateTimeFilter<"election"> | Date | string
    end_date?: DateTimeFilter<"election"> | Date | string
    is_active?: BoolFilter<"election"> | boolean
    target_occupation?: StringNullableFilter<"election"> | string | null
    target_location?: StringNullableFilter<"election"> | string | null
    birthdate_min?: DateTimeNullableFilter<"election"> | Date | string | null
    birthdate_max?: DateTimeNullableFilter<"election"> | Date | string | null
    target_gender?: StringNullableFilter<"election"> | string | null
    userId?: IntFilter<"election"> | number
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    poll_candidates?: Poll_candidatesListRelationFilter
    takepart?: TakepartListRelationFilter
    votes?: VoteListRelationFilter
  }, "id">

  export type electionOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    is_active?: SortOrder
    target_occupation?: SortOrderInput | SortOrder
    target_location?: SortOrderInput | SortOrder
    birthdate_min?: SortOrderInput | SortOrder
    birthdate_max?: SortOrderInput | SortOrder
    target_gender?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: electionCountOrderByAggregateInput
    _avg?: electionAvgOrderByAggregateInput
    _max?: electionMaxOrderByAggregateInput
    _min?: electionMinOrderByAggregateInput
    _sum?: electionSumOrderByAggregateInput
  }

  export type electionScalarWhereWithAggregatesInput = {
    AND?: electionScalarWhereWithAggregatesInput | electionScalarWhereWithAggregatesInput[]
    OR?: electionScalarWhereWithAggregatesInput[]
    NOT?: electionScalarWhereWithAggregatesInput | electionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"election"> | number
    title?: StringWithAggregatesFilter<"election"> | string
    description?: StringNullableWithAggregatesFilter<"election"> | string | null
    start_date?: DateTimeWithAggregatesFilter<"election"> | Date | string
    end_date?: DateTimeWithAggregatesFilter<"election"> | Date | string
    is_active?: BoolWithAggregatesFilter<"election"> | boolean
    target_occupation?: StringNullableWithAggregatesFilter<"election"> | string | null
    target_location?: StringNullableWithAggregatesFilter<"election"> | string | null
    birthdate_min?: DateTimeNullableWithAggregatesFilter<"election"> | Date | string | null
    birthdate_max?: DateTimeNullableWithAggregatesFilter<"election"> | Date | string | null
    target_gender?: StringNullableWithAggregatesFilter<"election"> | string | null
    userId?: IntWithAggregatesFilter<"election"> | number
  }

  export type poll_candidatesWhereInput = {
    AND?: poll_candidatesWhereInput | poll_candidatesWhereInput[]
    OR?: poll_candidatesWhereInput[]
    NOT?: poll_candidatesWhereInput | poll_candidatesWhereInput[]
    id?: IntFilter<"poll_candidates"> | number
    poll_id?: IntFilter<"poll_candidates"> | number
    user_id?: IntFilter<"poll_candidates"> | number
    invited_at?: DateTimeFilter<"poll_candidates"> | Date | string
    election?: XOR<ElectionScalarRelationFilter, electionWhereInput>
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type poll_candidatesOrderByWithRelationInput = {
    id?: SortOrder
    poll_id?: SortOrder
    user_id?: SortOrder
    invited_at?: SortOrder
    election?: electionOrderByWithRelationInput
    user?: userOrderByWithRelationInput
  }

  export type poll_candidatesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: poll_candidatesWhereInput | poll_candidatesWhereInput[]
    OR?: poll_candidatesWhereInput[]
    NOT?: poll_candidatesWhereInput | poll_candidatesWhereInput[]
    poll_id?: IntFilter<"poll_candidates"> | number
    user_id?: IntFilter<"poll_candidates"> | number
    invited_at?: DateTimeFilter<"poll_candidates"> | Date | string
    election?: XOR<ElectionScalarRelationFilter, electionWhereInput>
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "id">

  export type poll_candidatesOrderByWithAggregationInput = {
    id?: SortOrder
    poll_id?: SortOrder
    user_id?: SortOrder
    invited_at?: SortOrder
    _count?: poll_candidatesCountOrderByAggregateInput
    _avg?: poll_candidatesAvgOrderByAggregateInput
    _max?: poll_candidatesMaxOrderByAggregateInput
    _min?: poll_candidatesMinOrderByAggregateInput
    _sum?: poll_candidatesSumOrderByAggregateInput
  }

  export type poll_candidatesScalarWhereWithAggregatesInput = {
    AND?: poll_candidatesScalarWhereWithAggregatesInput | poll_candidatesScalarWhereWithAggregatesInput[]
    OR?: poll_candidatesScalarWhereWithAggregatesInput[]
    NOT?: poll_candidatesScalarWhereWithAggregatesInput | poll_candidatesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"poll_candidates"> | number
    poll_id?: IntWithAggregatesFilter<"poll_candidates"> | number
    user_id?: IntWithAggregatesFilter<"poll_candidates"> | number
    invited_at?: DateTimeWithAggregatesFilter<"poll_candidates"> | Date | string
  }

  export type takepartWhereInput = {
    AND?: takepartWhereInput | takepartWhereInput[]
    OR?: takepartWhereInput[]
    NOT?: takepartWhereInput | takepartWhereInput[]
    electionId?: IntFilter<"takepart"> | number
    candidateId?: IntFilter<"takepart"> | number
    numberOfVotes?: IntFilter<"takepart"> | number
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    election?: XOR<ElectionScalarRelationFilter, electionWhereInput>
  }

  export type takepartOrderByWithRelationInput = {
    electionId?: SortOrder
    candidateId?: SortOrder
    numberOfVotes?: SortOrder
    user?: userOrderByWithRelationInput
    election?: electionOrderByWithRelationInput
  }

  export type takepartWhereUniqueInput = Prisma.AtLeast<{
    electionId_candidateId?: takepartElectionIdCandidateIdCompoundUniqueInput
    AND?: takepartWhereInput | takepartWhereInput[]
    OR?: takepartWhereInput[]
    NOT?: takepartWhereInput | takepartWhereInput[]
    electionId?: IntFilter<"takepart"> | number
    candidateId?: IntFilter<"takepart"> | number
    numberOfVotes?: IntFilter<"takepart"> | number
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    election?: XOR<ElectionScalarRelationFilter, electionWhereInput>
  }, "electionId_candidateId">

  export type takepartOrderByWithAggregationInput = {
    electionId?: SortOrder
    candidateId?: SortOrder
    numberOfVotes?: SortOrder
    _count?: takepartCountOrderByAggregateInput
    _avg?: takepartAvgOrderByAggregateInput
    _max?: takepartMaxOrderByAggregateInput
    _min?: takepartMinOrderByAggregateInput
    _sum?: takepartSumOrderByAggregateInput
  }

  export type takepartScalarWhereWithAggregatesInput = {
    AND?: takepartScalarWhereWithAggregatesInput | takepartScalarWhereWithAggregatesInput[]
    OR?: takepartScalarWhereWithAggregatesInput[]
    NOT?: takepartScalarWhereWithAggregatesInput | takepartScalarWhereWithAggregatesInput[]
    electionId?: IntWithAggregatesFilter<"takepart"> | number
    candidateId?: IntWithAggregatesFilter<"takepart"> | number
    numberOfVotes?: IntWithAggregatesFilter<"takepart"> | number
  }

  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    id?: IntFilter<"user"> | number
    clerkId?: StringFilter<"user"> | string
    fullName?: StringFilter<"user"> | string
    username?: StringFilter<"user"> | string
    password?: StringFilter<"user"> | string
    isAdmin?: BoolFilter<"user"> | boolean
    gender?: StringNullableFilter<"user"> | string | null
    email?: StringFilter<"user"> | string
    birthdate?: DateTimeNullableFilter<"user"> | Date | string | null
    occupation?: StringNullableFilter<"user"> | string | null
    location?: StringNullableFilter<"user"> | string | null
    election?: ElectionListRelationFilter
    poll_candidates?: Poll_candidatesListRelationFilter
    takepart?: TakepartListRelationFilter
    votes?: VoteListRelationFilter
    candidateVotes?: VoteListRelationFilter
  }

  export type userOrderByWithRelationInput = {
    id?: SortOrder
    clerkId?: SortOrder
    fullName?: SortOrder
    username?: SortOrder
    password?: SortOrder
    isAdmin?: SortOrder
    gender?: SortOrderInput | SortOrder
    email?: SortOrder
    birthdate?: SortOrderInput | SortOrder
    occupation?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    election?: electionOrderByRelationAggregateInput
    poll_candidates?: poll_candidatesOrderByRelationAggregateInput
    takepart?: takepartOrderByRelationAggregateInput
    votes?: VoteOrderByRelationAggregateInput
    candidateVotes?: VoteOrderByRelationAggregateInput
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    clerkId?: string
    username?: string
    email?: string
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    fullName?: StringFilter<"user"> | string
    password?: StringFilter<"user"> | string
    isAdmin?: BoolFilter<"user"> | boolean
    gender?: StringNullableFilter<"user"> | string | null
    birthdate?: DateTimeNullableFilter<"user"> | Date | string | null
    occupation?: StringNullableFilter<"user"> | string | null
    location?: StringNullableFilter<"user"> | string | null
    election?: ElectionListRelationFilter
    poll_candidates?: Poll_candidatesListRelationFilter
    takepart?: TakepartListRelationFilter
    votes?: VoteListRelationFilter
    candidateVotes?: VoteListRelationFilter
  }, "id" | "clerkId" | "username" | "email">

  export type userOrderByWithAggregationInput = {
    id?: SortOrder
    clerkId?: SortOrder
    fullName?: SortOrder
    username?: SortOrder
    password?: SortOrder
    isAdmin?: SortOrder
    gender?: SortOrderInput | SortOrder
    email?: SortOrder
    birthdate?: SortOrderInput | SortOrder
    occupation?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    _count?: userCountOrderByAggregateInput
    _avg?: userAvgOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
    _sum?: userSumOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"user"> | number
    clerkId?: StringWithAggregatesFilter<"user"> | string
    fullName?: StringWithAggregatesFilter<"user"> | string
    username?: StringWithAggregatesFilter<"user"> | string
    password?: StringWithAggregatesFilter<"user"> | string
    isAdmin?: BoolWithAggregatesFilter<"user"> | boolean
    gender?: StringNullableWithAggregatesFilter<"user"> | string | null
    email?: StringWithAggregatesFilter<"user"> | string
    birthdate?: DateTimeNullableWithAggregatesFilter<"user"> | Date | string | null
    occupation?: StringNullableWithAggregatesFilter<"user"> | string | null
    location?: StringNullableWithAggregatesFilter<"user"> | string | null
  }

  export type VoteWhereInput = {
    AND?: VoteWhereInput | VoteWhereInput[]
    OR?: VoteWhereInput[]
    NOT?: VoteWhereInput | VoteWhereInput[]
    id?: IntFilter<"Vote"> | number
    userId?: IntFilter<"Vote"> | number
    electionId?: IntFilter<"Vote"> | number
    candidateId?: IntFilter<"Vote"> | number
    votedAt?: DateTimeFilter<"Vote"> | Date | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    election?: XOR<ElectionScalarRelationFilter, electionWhereInput>
    candidate?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type VoteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    electionId?: SortOrder
    candidateId?: SortOrder
    votedAt?: SortOrder
    user?: userOrderByWithRelationInput
    election?: electionOrderByWithRelationInput
    candidate?: userOrderByWithRelationInput
  }

  export type VoteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_electionId?: VoteUserIdElectionIdCompoundUniqueInput
    AND?: VoteWhereInput | VoteWhereInput[]
    OR?: VoteWhereInput[]
    NOT?: VoteWhereInput | VoteWhereInput[]
    userId?: IntFilter<"Vote"> | number
    electionId?: IntFilter<"Vote"> | number
    candidateId?: IntFilter<"Vote"> | number
    votedAt?: DateTimeFilter<"Vote"> | Date | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    election?: XOR<ElectionScalarRelationFilter, electionWhereInput>
    candidate?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "id" | "userId_electionId">

  export type VoteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    electionId?: SortOrder
    candidateId?: SortOrder
    votedAt?: SortOrder
    _count?: VoteCountOrderByAggregateInput
    _avg?: VoteAvgOrderByAggregateInput
    _max?: VoteMaxOrderByAggregateInput
    _min?: VoteMinOrderByAggregateInput
    _sum?: VoteSumOrderByAggregateInput
  }

  export type VoteScalarWhereWithAggregatesInput = {
    AND?: VoteScalarWhereWithAggregatesInput | VoteScalarWhereWithAggregatesInput[]
    OR?: VoteScalarWhereWithAggregatesInput[]
    NOT?: VoteScalarWhereWithAggregatesInput | VoteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Vote"> | number
    userId?: IntWithAggregatesFilter<"Vote"> | number
    electionId?: IntWithAggregatesFilter<"Vote"> | number
    candidateId?: IntWithAggregatesFilter<"Vote"> | number
    votedAt?: DateTimeWithAggregatesFilter<"Vote"> | Date | string
  }

  export type electionCreateInput = {
    title: string
    description?: string | null
    start_date: Date | string
    end_date: Date | string
    is_active: boolean
    target_occupation?: string | null
    target_location?: string | null
    birthdate_min?: Date | string | null
    birthdate_max?: Date | string | null
    target_gender?: string | null
    user: userCreateNestedOneWithoutElectionInput
    poll_candidates?: poll_candidatesCreateNestedManyWithoutElectionInput
    takepart?: takepartCreateNestedManyWithoutElectionInput
    votes?: VoteCreateNestedManyWithoutElectionInput
  }

  export type electionUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    start_date: Date | string
    end_date: Date | string
    is_active: boolean
    target_occupation?: string | null
    target_location?: string | null
    birthdate_min?: Date | string | null
    birthdate_max?: Date | string | null
    target_gender?: string | null
    userId: number
    poll_candidates?: poll_candidatesUncheckedCreateNestedManyWithoutElectionInput
    takepart?: takepartUncheckedCreateNestedManyWithoutElectionInput
    votes?: VoteUncheckedCreateNestedManyWithoutElectionInput
  }

  export type electionUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    target_occupation?: NullableStringFieldUpdateOperationsInput | string | null
    target_location?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate_min?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthdate_max?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    target_gender?: NullableStringFieldUpdateOperationsInput | string | null
    user?: userUpdateOneRequiredWithoutElectionNestedInput
    poll_candidates?: poll_candidatesUpdateManyWithoutElectionNestedInput
    takepart?: takepartUpdateManyWithoutElectionNestedInput
    votes?: VoteUpdateManyWithoutElectionNestedInput
  }

  export type electionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    target_occupation?: NullableStringFieldUpdateOperationsInput | string | null
    target_location?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate_min?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthdate_max?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    target_gender?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: IntFieldUpdateOperationsInput | number
    poll_candidates?: poll_candidatesUncheckedUpdateManyWithoutElectionNestedInput
    takepart?: takepartUncheckedUpdateManyWithoutElectionNestedInput
    votes?: VoteUncheckedUpdateManyWithoutElectionNestedInput
  }

  export type electionCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    start_date: Date | string
    end_date: Date | string
    is_active: boolean
    target_occupation?: string | null
    target_location?: string | null
    birthdate_min?: Date | string | null
    birthdate_max?: Date | string | null
    target_gender?: string | null
    userId: number
  }

  export type electionUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    target_occupation?: NullableStringFieldUpdateOperationsInput | string | null
    target_location?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate_min?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthdate_max?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    target_gender?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type electionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    target_occupation?: NullableStringFieldUpdateOperationsInput | string | null
    target_location?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate_min?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthdate_max?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    target_gender?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type poll_candidatesCreateInput = {
    invited_at?: Date | string
    election: electionCreateNestedOneWithoutPoll_candidatesInput
    user: userCreateNestedOneWithoutPoll_candidatesInput
  }

  export type poll_candidatesUncheckedCreateInput = {
    id?: number
    poll_id: number
    user_id: number
    invited_at?: Date | string
  }

  export type poll_candidatesUpdateInput = {
    invited_at?: DateTimeFieldUpdateOperationsInput | Date | string
    election?: electionUpdateOneRequiredWithoutPoll_candidatesNestedInput
    user?: userUpdateOneRequiredWithoutPoll_candidatesNestedInput
  }

  export type poll_candidatesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    poll_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    invited_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type poll_candidatesCreateManyInput = {
    id?: number
    poll_id: number
    user_id: number
    invited_at?: Date | string
  }

  export type poll_candidatesUpdateManyMutationInput = {
    invited_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type poll_candidatesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    poll_id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    invited_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type takepartCreateInput = {
    numberOfVotes: number
    user: userCreateNestedOneWithoutTakepartInput
    election: electionCreateNestedOneWithoutTakepartInput
  }

  export type takepartUncheckedCreateInput = {
    electionId: number
    candidateId: number
    numberOfVotes: number
  }

  export type takepartUpdateInput = {
    numberOfVotes?: IntFieldUpdateOperationsInput | number
    user?: userUpdateOneRequiredWithoutTakepartNestedInput
    election?: electionUpdateOneRequiredWithoutTakepartNestedInput
  }

  export type takepartUncheckedUpdateInput = {
    electionId?: IntFieldUpdateOperationsInput | number
    candidateId?: IntFieldUpdateOperationsInput | number
    numberOfVotes?: IntFieldUpdateOperationsInput | number
  }

  export type takepartCreateManyInput = {
    electionId: number
    candidateId: number
    numberOfVotes: number
  }

  export type takepartUpdateManyMutationInput = {
    numberOfVotes?: IntFieldUpdateOperationsInput | number
  }

  export type takepartUncheckedUpdateManyInput = {
    electionId?: IntFieldUpdateOperationsInput | number
    candidateId?: IntFieldUpdateOperationsInput | number
    numberOfVotes?: IntFieldUpdateOperationsInput | number
  }

  export type userCreateInput = {
    clerkId: string
    fullName: string
    username: string
    password: string
    isAdmin: boolean
    gender?: string | null
    email: string
    birthdate?: Date | string | null
    occupation?: string | null
    location?: string | null
    election?: electionCreateNestedManyWithoutUserInput
    poll_candidates?: poll_candidatesCreateNestedManyWithoutUserInput
    takepart?: takepartCreateNestedManyWithoutUserInput
    votes?: VoteCreateNestedManyWithoutUserInput
    candidateVotes?: VoteCreateNestedManyWithoutCandidateInput
  }

  export type userUncheckedCreateInput = {
    id?: number
    clerkId: string
    fullName: string
    username: string
    password: string
    isAdmin: boolean
    gender?: string | null
    email: string
    birthdate?: Date | string | null
    occupation?: string | null
    location?: string | null
    election?: electionUncheckedCreateNestedManyWithoutUserInput
    poll_candidates?: poll_candidatesUncheckedCreateNestedManyWithoutUserInput
    takepart?: takepartUncheckedCreateNestedManyWithoutUserInput
    votes?: VoteUncheckedCreateNestedManyWithoutUserInput
    candidateVotes?: VoteUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type userUpdateInput = {
    clerkId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    election?: electionUpdateManyWithoutUserNestedInput
    poll_candidates?: poll_candidatesUpdateManyWithoutUserNestedInput
    takepart?: takepartUpdateManyWithoutUserNestedInput
    votes?: VoteUpdateManyWithoutUserNestedInput
    candidateVotes?: VoteUpdateManyWithoutCandidateNestedInput
  }

  export type userUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    clerkId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    election?: electionUncheckedUpdateManyWithoutUserNestedInput
    poll_candidates?: poll_candidatesUncheckedUpdateManyWithoutUserNestedInput
    takepart?: takepartUncheckedUpdateManyWithoutUserNestedInput
    votes?: VoteUncheckedUpdateManyWithoutUserNestedInput
    candidateVotes?: VoteUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type userCreateManyInput = {
    id?: number
    clerkId: string
    fullName: string
    username: string
    password: string
    isAdmin: boolean
    gender?: string | null
    email: string
    birthdate?: Date | string | null
    occupation?: string | null
    location?: string | null
  }

  export type userUpdateManyMutationInput = {
    clerkId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type userUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    clerkId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VoteCreateInput = {
    votedAt?: Date | string
    user: userCreateNestedOneWithoutVotesInput
    election: electionCreateNestedOneWithoutVotesInput
    candidate: userCreateNestedOneWithoutCandidateVotesInput
  }

  export type VoteUncheckedCreateInput = {
    id?: number
    userId: number
    electionId: number
    candidateId: number
    votedAt?: Date | string
  }

  export type VoteUpdateInput = {
    votedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateOneRequiredWithoutVotesNestedInput
    election?: electionUpdateOneRequiredWithoutVotesNestedInput
    candidate?: userUpdateOneRequiredWithoutCandidateVotesNestedInput
  }

  export type VoteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    electionId?: IntFieldUpdateOperationsInput | number
    candidateId?: IntFieldUpdateOperationsInput | number
    votedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteCreateManyInput = {
    id?: number
    userId: number
    electionId: number
    candidateId: number
    votedAt?: Date | string
  }

  export type VoteUpdateManyMutationInput = {
    votedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    electionId?: IntFieldUpdateOperationsInput | number
    candidateId?: IntFieldUpdateOperationsInput | number
    votedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: userWhereInput
    isNot?: userWhereInput
  }

  export type Poll_candidatesListRelationFilter = {
    every?: poll_candidatesWhereInput
    some?: poll_candidatesWhereInput
    none?: poll_candidatesWhereInput
  }

  export type TakepartListRelationFilter = {
    every?: takepartWhereInput
    some?: takepartWhereInput
    none?: takepartWhereInput
  }

  export type VoteListRelationFilter = {
    every?: VoteWhereInput
    some?: VoteWhereInput
    none?: VoteWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type poll_candidatesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type takepartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type electionCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    is_active?: SortOrder
    target_occupation?: SortOrder
    target_location?: SortOrder
    birthdate_min?: SortOrder
    birthdate_max?: SortOrder
    target_gender?: SortOrder
    userId?: SortOrder
  }

  export type electionAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type electionMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    is_active?: SortOrder
    target_occupation?: SortOrder
    target_location?: SortOrder
    birthdate_min?: SortOrder
    birthdate_max?: SortOrder
    target_gender?: SortOrder
    userId?: SortOrder
  }

  export type electionMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    is_active?: SortOrder
    target_occupation?: SortOrder
    target_location?: SortOrder
    birthdate_min?: SortOrder
    birthdate_max?: SortOrder
    target_gender?: SortOrder
    userId?: SortOrder
  }

  export type electionSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ElectionScalarRelationFilter = {
    is?: electionWhereInput
    isNot?: electionWhereInput
  }

  export type poll_candidatesCountOrderByAggregateInput = {
    id?: SortOrder
    poll_id?: SortOrder
    user_id?: SortOrder
    invited_at?: SortOrder
  }

  export type poll_candidatesAvgOrderByAggregateInput = {
    id?: SortOrder
    poll_id?: SortOrder
    user_id?: SortOrder
  }

  export type poll_candidatesMaxOrderByAggregateInput = {
    id?: SortOrder
    poll_id?: SortOrder
    user_id?: SortOrder
    invited_at?: SortOrder
  }

  export type poll_candidatesMinOrderByAggregateInput = {
    id?: SortOrder
    poll_id?: SortOrder
    user_id?: SortOrder
    invited_at?: SortOrder
  }

  export type poll_candidatesSumOrderByAggregateInput = {
    id?: SortOrder
    poll_id?: SortOrder
    user_id?: SortOrder
  }

  export type takepartElectionIdCandidateIdCompoundUniqueInput = {
    electionId: number
    candidateId: number
  }

  export type takepartCountOrderByAggregateInput = {
    electionId?: SortOrder
    candidateId?: SortOrder
    numberOfVotes?: SortOrder
  }

  export type takepartAvgOrderByAggregateInput = {
    electionId?: SortOrder
    candidateId?: SortOrder
    numberOfVotes?: SortOrder
  }

  export type takepartMaxOrderByAggregateInput = {
    electionId?: SortOrder
    candidateId?: SortOrder
    numberOfVotes?: SortOrder
  }

  export type takepartMinOrderByAggregateInput = {
    electionId?: SortOrder
    candidateId?: SortOrder
    numberOfVotes?: SortOrder
  }

  export type takepartSumOrderByAggregateInput = {
    electionId?: SortOrder
    candidateId?: SortOrder
    numberOfVotes?: SortOrder
  }

  export type ElectionListRelationFilter = {
    every?: electionWhereInput
    some?: electionWhereInput
    none?: electionWhereInput
  }

  export type electionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type userCountOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    fullName?: SortOrder
    username?: SortOrder
    password?: SortOrder
    isAdmin?: SortOrder
    gender?: SortOrder
    email?: SortOrder
    birthdate?: SortOrder
    occupation?: SortOrder
    location?: SortOrder
  }

  export type userAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    fullName?: SortOrder
    username?: SortOrder
    password?: SortOrder
    isAdmin?: SortOrder
    gender?: SortOrder
    email?: SortOrder
    birthdate?: SortOrder
    occupation?: SortOrder
    location?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    fullName?: SortOrder
    username?: SortOrder
    password?: SortOrder
    isAdmin?: SortOrder
    gender?: SortOrder
    email?: SortOrder
    birthdate?: SortOrder
    occupation?: SortOrder
    location?: SortOrder
  }

  export type userSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type VoteUserIdElectionIdCompoundUniqueInput = {
    userId: number
    electionId: number
  }

  export type VoteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    electionId?: SortOrder
    candidateId?: SortOrder
    votedAt?: SortOrder
  }

  export type VoteAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    electionId?: SortOrder
    candidateId?: SortOrder
  }

  export type VoteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    electionId?: SortOrder
    candidateId?: SortOrder
    votedAt?: SortOrder
  }

  export type VoteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    electionId?: SortOrder
    candidateId?: SortOrder
    votedAt?: SortOrder
  }

  export type VoteSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    electionId?: SortOrder
    candidateId?: SortOrder
  }

  export type userCreateNestedOneWithoutElectionInput = {
    create?: XOR<userCreateWithoutElectionInput, userUncheckedCreateWithoutElectionInput>
    connectOrCreate?: userCreateOrConnectWithoutElectionInput
    connect?: userWhereUniqueInput
  }

  export type poll_candidatesCreateNestedManyWithoutElectionInput = {
    create?: XOR<poll_candidatesCreateWithoutElectionInput, poll_candidatesUncheckedCreateWithoutElectionInput> | poll_candidatesCreateWithoutElectionInput[] | poll_candidatesUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: poll_candidatesCreateOrConnectWithoutElectionInput | poll_candidatesCreateOrConnectWithoutElectionInput[]
    createMany?: poll_candidatesCreateManyElectionInputEnvelope
    connect?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
  }

  export type takepartCreateNestedManyWithoutElectionInput = {
    create?: XOR<takepartCreateWithoutElectionInput, takepartUncheckedCreateWithoutElectionInput> | takepartCreateWithoutElectionInput[] | takepartUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: takepartCreateOrConnectWithoutElectionInput | takepartCreateOrConnectWithoutElectionInput[]
    createMany?: takepartCreateManyElectionInputEnvelope
    connect?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
  }

  export type VoteCreateNestedManyWithoutElectionInput = {
    create?: XOR<VoteCreateWithoutElectionInput, VoteUncheckedCreateWithoutElectionInput> | VoteCreateWithoutElectionInput[] | VoteUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutElectionInput | VoteCreateOrConnectWithoutElectionInput[]
    createMany?: VoteCreateManyElectionInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type poll_candidatesUncheckedCreateNestedManyWithoutElectionInput = {
    create?: XOR<poll_candidatesCreateWithoutElectionInput, poll_candidatesUncheckedCreateWithoutElectionInput> | poll_candidatesCreateWithoutElectionInput[] | poll_candidatesUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: poll_candidatesCreateOrConnectWithoutElectionInput | poll_candidatesCreateOrConnectWithoutElectionInput[]
    createMany?: poll_candidatesCreateManyElectionInputEnvelope
    connect?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
  }

  export type takepartUncheckedCreateNestedManyWithoutElectionInput = {
    create?: XOR<takepartCreateWithoutElectionInput, takepartUncheckedCreateWithoutElectionInput> | takepartCreateWithoutElectionInput[] | takepartUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: takepartCreateOrConnectWithoutElectionInput | takepartCreateOrConnectWithoutElectionInput[]
    createMany?: takepartCreateManyElectionInputEnvelope
    connect?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
  }

  export type VoteUncheckedCreateNestedManyWithoutElectionInput = {
    create?: XOR<VoteCreateWithoutElectionInput, VoteUncheckedCreateWithoutElectionInput> | VoteCreateWithoutElectionInput[] | VoteUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutElectionInput | VoteCreateOrConnectWithoutElectionInput[]
    createMany?: VoteCreateManyElectionInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type userUpdateOneRequiredWithoutElectionNestedInput = {
    create?: XOR<userCreateWithoutElectionInput, userUncheckedCreateWithoutElectionInput>
    connectOrCreate?: userCreateOrConnectWithoutElectionInput
    upsert?: userUpsertWithoutElectionInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutElectionInput, userUpdateWithoutElectionInput>, userUncheckedUpdateWithoutElectionInput>
  }

  export type poll_candidatesUpdateManyWithoutElectionNestedInput = {
    create?: XOR<poll_candidatesCreateWithoutElectionInput, poll_candidatesUncheckedCreateWithoutElectionInput> | poll_candidatesCreateWithoutElectionInput[] | poll_candidatesUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: poll_candidatesCreateOrConnectWithoutElectionInput | poll_candidatesCreateOrConnectWithoutElectionInput[]
    upsert?: poll_candidatesUpsertWithWhereUniqueWithoutElectionInput | poll_candidatesUpsertWithWhereUniqueWithoutElectionInput[]
    createMany?: poll_candidatesCreateManyElectionInputEnvelope
    set?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
    disconnect?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
    delete?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
    connect?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
    update?: poll_candidatesUpdateWithWhereUniqueWithoutElectionInput | poll_candidatesUpdateWithWhereUniqueWithoutElectionInput[]
    updateMany?: poll_candidatesUpdateManyWithWhereWithoutElectionInput | poll_candidatesUpdateManyWithWhereWithoutElectionInput[]
    deleteMany?: poll_candidatesScalarWhereInput | poll_candidatesScalarWhereInput[]
  }

  export type takepartUpdateManyWithoutElectionNestedInput = {
    create?: XOR<takepartCreateWithoutElectionInput, takepartUncheckedCreateWithoutElectionInput> | takepartCreateWithoutElectionInput[] | takepartUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: takepartCreateOrConnectWithoutElectionInput | takepartCreateOrConnectWithoutElectionInput[]
    upsert?: takepartUpsertWithWhereUniqueWithoutElectionInput | takepartUpsertWithWhereUniqueWithoutElectionInput[]
    createMany?: takepartCreateManyElectionInputEnvelope
    set?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
    disconnect?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
    delete?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
    connect?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
    update?: takepartUpdateWithWhereUniqueWithoutElectionInput | takepartUpdateWithWhereUniqueWithoutElectionInput[]
    updateMany?: takepartUpdateManyWithWhereWithoutElectionInput | takepartUpdateManyWithWhereWithoutElectionInput[]
    deleteMany?: takepartScalarWhereInput | takepartScalarWhereInput[]
  }

  export type VoteUpdateManyWithoutElectionNestedInput = {
    create?: XOR<VoteCreateWithoutElectionInput, VoteUncheckedCreateWithoutElectionInput> | VoteCreateWithoutElectionInput[] | VoteUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutElectionInput | VoteCreateOrConnectWithoutElectionInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutElectionInput | VoteUpsertWithWhereUniqueWithoutElectionInput[]
    createMany?: VoteCreateManyElectionInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutElectionInput | VoteUpdateWithWhereUniqueWithoutElectionInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutElectionInput | VoteUpdateManyWithWhereWithoutElectionInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type poll_candidatesUncheckedUpdateManyWithoutElectionNestedInput = {
    create?: XOR<poll_candidatesCreateWithoutElectionInput, poll_candidatesUncheckedCreateWithoutElectionInput> | poll_candidatesCreateWithoutElectionInput[] | poll_candidatesUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: poll_candidatesCreateOrConnectWithoutElectionInput | poll_candidatesCreateOrConnectWithoutElectionInput[]
    upsert?: poll_candidatesUpsertWithWhereUniqueWithoutElectionInput | poll_candidatesUpsertWithWhereUniqueWithoutElectionInput[]
    createMany?: poll_candidatesCreateManyElectionInputEnvelope
    set?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
    disconnect?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
    delete?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
    connect?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
    update?: poll_candidatesUpdateWithWhereUniqueWithoutElectionInput | poll_candidatesUpdateWithWhereUniqueWithoutElectionInput[]
    updateMany?: poll_candidatesUpdateManyWithWhereWithoutElectionInput | poll_candidatesUpdateManyWithWhereWithoutElectionInput[]
    deleteMany?: poll_candidatesScalarWhereInput | poll_candidatesScalarWhereInput[]
  }

  export type takepartUncheckedUpdateManyWithoutElectionNestedInput = {
    create?: XOR<takepartCreateWithoutElectionInput, takepartUncheckedCreateWithoutElectionInput> | takepartCreateWithoutElectionInput[] | takepartUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: takepartCreateOrConnectWithoutElectionInput | takepartCreateOrConnectWithoutElectionInput[]
    upsert?: takepartUpsertWithWhereUniqueWithoutElectionInput | takepartUpsertWithWhereUniqueWithoutElectionInput[]
    createMany?: takepartCreateManyElectionInputEnvelope
    set?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
    disconnect?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
    delete?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
    connect?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
    update?: takepartUpdateWithWhereUniqueWithoutElectionInput | takepartUpdateWithWhereUniqueWithoutElectionInput[]
    updateMany?: takepartUpdateManyWithWhereWithoutElectionInput | takepartUpdateManyWithWhereWithoutElectionInput[]
    deleteMany?: takepartScalarWhereInput | takepartScalarWhereInput[]
  }

  export type VoteUncheckedUpdateManyWithoutElectionNestedInput = {
    create?: XOR<VoteCreateWithoutElectionInput, VoteUncheckedCreateWithoutElectionInput> | VoteCreateWithoutElectionInput[] | VoteUncheckedCreateWithoutElectionInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutElectionInput | VoteCreateOrConnectWithoutElectionInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutElectionInput | VoteUpsertWithWhereUniqueWithoutElectionInput[]
    createMany?: VoteCreateManyElectionInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutElectionInput | VoteUpdateWithWhereUniqueWithoutElectionInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutElectionInput | VoteUpdateManyWithWhereWithoutElectionInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type electionCreateNestedOneWithoutPoll_candidatesInput = {
    create?: XOR<electionCreateWithoutPoll_candidatesInput, electionUncheckedCreateWithoutPoll_candidatesInput>
    connectOrCreate?: electionCreateOrConnectWithoutPoll_candidatesInput
    connect?: electionWhereUniqueInput
  }

  export type userCreateNestedOneWithoutPoll_candidatesInput = {
    create?: XOR<userCreateWithoutPoll_candidatesInput, userUncheckedCreateWithoutPoll_candidatesInput>
    connectOrCreate?: userCreateOrConnectWithoutPoll_candidatesInput
    connect?: userWhereUniqueInput
  }

  export type electionUpdateOneRequiredWithoutPoll_candidatesNestedInput = {
    create?: XOR<electionCreateWithoutPoll_candidatesInput, electionUncheckedCreateWithoutPoll_candidatesInput>
    connectOrCreate?: electionCreateOrConnectWithoutPoll_candidatesInput
    upsert?: electionUpsertWithoutPoll_candidatesInput
    connect?: electionWhereUniqueInput
    update?: XOR<XOR<electionUpdateToOneWithWhereWithoutPoll_candidatesInput, electionUpdateWithoutPoll_candidatesInput>, electionUncheckedUpdateWithoutPoll_candidatesInput>
  }

  export type userUpdateOneRequiredWithoutPoll_candidatesNestedInput = {
    create?: XOR<userCreateWithoutPoll_candidatesInput, userUncheckedCreateWithoutPoll_candidatesInput>
    connectOrCreate?: userCreateOrConnectWithoutPoll_candidatesInput
    upsert?: userUpsertWithoutPoll_candidatesInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutPoll_candidatesInput, userUpdateWithoutPoll_candidatesInput>, userUncheckedUpdateWithoutPoll_candidatesInput>
  }

  export type userCreateNestedOneWithoutTakepartInput = {
    create?: XOR<userCreateWithoutTakepartInput, userUncheckedCreateWithoutTakepartInput>
    connectOrCreate?: userCreateOrConnectWithoutTakepartInput
    connect?: userWhereUniqueInput
  }

  export type electionCreateNestedOneWithoutTakepartInput = {
    create?: XOR<electionCreateWithoutTakepartInput, electionUncheckedCreateWithoutTakepartInput>
    connectOrCreate?: electionCreateOrConnectWithoutTakepartInput
    connect?: electionWhereUniqueInput
  }

  export type userUpdateOneRequiredWithoutTakepartNestedInput = {
    create?: XOR<userCreateWithoutTakepartInput, userUncheckedCreateWithoutTakepartInput>
    connectOrCreate?: userCreateOrConnectWithoutTakepartInput
    upsert?: userUpsertWithoutTakepartInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutTakepartInput, userUpdateWithoutTakepartInput>, userUncheckedUpdateWithoutTakepartInput>
  }

  export type electionUpdateOneRequiredWithoutTakepartNestedInput = {
    create?: XOR<electionCreateWithoutTakepartInput, electionUncheckedCreateWithoutTakepartInput>
    connectOrCreate?: electionCreateOrConnectWithoutTakepartInput
    upsert?: electionUpsertWithoutTakepartInput
    connect?: electionWhereUniqueInput
    update?: XOR<XOR<electionUpdateToOneWithWhereWithoutTakepartInput, electionUpdateWithoutTakepartInput>, electionUncheckedUpdateWithoutTakepartInput>
  }

  export type electionCreateNestedManyWithoutUserInput = {
    create?: XOR<electionCreateWithoutUserInput, electionUncheckedCreateWithoutUserInput> | electionCreateWithoutUserInput[] | electionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: electionCreateOrConnectWithoutUserInput | electionCreateOrConnectWithoutUserInput[]
    createMany?: electionCreateManyUserInputEnvelope
    connect?: electionWhereUniqueInput | electionWhereUniqueInput[]
  }

  export type poll_candidatesCreateNestedManyWithoutUserInput = {
    create?: XOR<poll_candidatesCreateWithoutUserInput, poll_candidatesUncheckedCreateWithoutUserInput> | poll_candidatesCreateWithoutUserInput[] | poll_candidatesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: poll_candidatesCreateOrConnectWithoutUserInput | poll_candidatesCreateOrConnectWithoutUserInput[]
    createMany?: poll_candidatesCreateManyUserInputEnvelope
    connect?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
  }

  export type takepartCreateNestedManyWithoutUserInput = {
    create?: XOR<takepartCreateWithoutUserInput, takepartUncheckedCreateWithoutUserInput> | takepartCreateWithoutUserInput[] | takepartUncheckedCreateWithoutUserInput[]
    connectOrCreate?: takepartCreateOrConnectWithoutUserInput | takepartCreateOrConnectWithoutUserInput[]
    createMany?: takepartCreateManyUserInputEnvelope
    connect?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
  }

  export type VoteCreateNestedManyWithoutUserInput = {
    create?: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput> | VoteCreateWithoutUserInput[] | VoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutUserInput | VoteCreateOrConnectWithoutUserInput[]
    createMany?: VoteCreateManyUserInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type VoteCreateNestedManyWithoutCandidateInput = {
    create?: XOR<VoteCreateWithoutCandidateInput, VoteUncheckedCreateWithoutCandidateInput> | VoteCreateWithoutCandidateInput[] | VoteUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutCandidateInput | VoteCreateOrConnectWithoutCandidateInput[]
    createMany?: VoteCreateManyCandidateInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type electionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<electionCreateWithoutUserInput, electionUncheckedCreateWithoutUserInput> | electionCreateWithoutUserInput[] | electionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: electionCreateOrConnectWithoutUserInput | electionCreateOrConnectWithoutUserInput[]
    createMany?: electionCreateManyUserInputEnvelope
    connect?: electionWhereUniqueInput | electionWhereUniqueInput[]
  }

  export type poll_candidatesUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<poll_candidatesCreateWithoutUserInput, poll_candidatesUncheckedCreateWithoutUserInput> | poll_candidatesCreateWithoutUserInput[] | poll_candidatesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: poll_candidatesCreateOrConnectWithoutUserInput | poll_candidatesCreateOrConnectWithoutUserInput[]
    createMany?: poll_candidatesCreateManyUserInputEnvelope
    connect?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
  }

  export type takepartUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<takepartCreateWithoutUserInput, takepartUncheckedCreateWithoutUserInput> | takepartCreateWithoutUserInput[] | takepartUncheckedCreateWithoutUserInput[]
    connectOrCreate?: takepartCreateOrConnectWithoutUserInput | takepartCreateOrConnectWithoutUserInput[]
    createMany?: takepartCreateManyUserInputEnvelope
    connect?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
  }

  export type VoteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput> | VoteCreateWithoutUserInput[] | VoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutUserInput | VoteCreateOrConnectWithoutUserInput[]
    createMany?: VoteCreateManyUserInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type VoteUncheckedCreateNestedManyWithoutCandidateInput = {
    create?: XOR<VoteCreateWithoutCandidateInput, VoteUncheckedCreateWithoutCandidateInput> | VoteCreateWithoutCandidateInput[] | VoteUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutCandidateInput | VoteCreateOrConnectWithoutCandidateInput[]
    createMany?: VoteCreateManyCandidateInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type electionUpdateManyWithoutUserNestedInput = {
    create?: XOR<electionCreateWithoutUserInput, electionUncheckedCreateWithoutUserInput> | electionCreateWithoutUserInput[] | electionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: electionCreateOrConnectWithoutUserInput | electionCreateOrConnectWithoutUserInput[]
    upsert?: electionUpsertWithWhereUniqueWithoutUserInput | electionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: electionCreateManyUserInputEnvelope
    set?: electionWhereUniqueInput | electionWhereUniqueInput[]
    disconnect?: electionWhereUniqueInput | electionWhereUniqueInput[]
    delete?: electionWhereUniqueInput | electionWhereUniqueInput[]
    connect?: electionWhereUniqueInput | electionWhereUniqueInput[]
    update?: electionUpdateWithWhereUniqueWithoutUserInput | electionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: electionUpdateManyWithWhereWithoutUserInput | electionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: electionScalarWhereInput | electionScalarWhereInput[]
  }

  export type poll_candidatesUpdateManyWithoutUserNestedInput = {
    create?: XOR<poll_candidatesCreateWithoutUserInput, poll_candidatesUncheckedCreateWithoutUserInput> | poll_candidatesCreateWithoutUserInput[] | poll_candidatesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: poll_candidatesCreateOrConnectWithoutUserInput | poll_candidatesCreateOrConnectWithoutUserInput[]
    upsert?: poll_candidatesUpsertWithWhereUniqueWithoutUserInput | poll_candidatesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: poll_candidatesCreateManyUserInputEnvelope
    set?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
    disconnect?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
    delete?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
    connect?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
    update?: poll_candidatesUpdateWithWhereUniqueWithoutUserInput | poll_candidatesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: poll_candidatesUpdateManyWithWhereWithoutUserInput | poll_candidatesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: poll_candidatesScalarWhereInput | poll_candidatesScalarWhereInput[]
  }

  export type takepartUpdateManyWithoutUserNestedInput = {
    create?: XOR<takepartCreateWithoutUserInput, takepartUncheckedCreateWithoutUserInput> | takepartCreateWithoutUserInput[] | takepartUncheckedCreateWithoutUserInput[]
    connectOrCreate?: takepartCreateOrConnectWithoutUserInput | takepartCreateOrConnectWithoutUserInput[]
    upsert?: takepartUpsertWithWhereUniqueWithoutUserInput | takepartUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: takepartCreateManyUserInputEnvelope
    set?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
    disconnect?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
    delete?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
    connect?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
    update?: takepartUpdateWithWhereUniqueWithoutUserInput | takepartUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: takepartUpdateManyWithWhereWithoutUserInput | takepartUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: takepartScalarWhereInput | takepartScalarWhereInput[]
  }

  export type VoteUpdateManyWithoutUserNestedInput = {
    create?: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput> | VoteCreateWithoutUserInput[] | VoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutUserInput | VoteCreateOrConnectWithoutUserInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutUserInput | VoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VoteCreateManyUserInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutUserInput | VoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutUserInput | VoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type VoteUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<VoteCreateWithoutCandidateInput, VoteUncheckedCreateWithoutCandidateInput> | VoteCreateWithoutCandidateInput[] | VoteUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutCandidateInput | VoteCreateOrConnectWithoutCandidateInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutCandidateInput | VoteUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: VoteCreateManyCandidateInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutCandidateInput | VoteUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutCandidateInput | VoteUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type electionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<electionCreateWithoutUserInput, electionUncheckedCreateWithoutUserInput> | electionCreateWithoutUserInput[] | electionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: electionCreateOrConnectWithoutUserInput | electionCreateOrConnectWithoutUserInput[]
    upsert?: electionUpsertWithWhereUniqueWithoutUserInput | electionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: electionCreateManyUserInputEnvelope
    set?: electionWhereUniqueInput | electionWhereUniqueInput[]
    disconnect?: electionWhereUniqueInput | electionWhereUniqueInput[]
    delete?: electionWhereUniqueInput | electionWhereUniqueInput[]
    connect?: electionWhereUniqueInput | electionWhereUniqueInput[]
    update?: electionUpdateWithWhereUniqueWithoutUserInput | electionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: electionUpdateManyWithWhereWithoutUserInput | electionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: electionScalarWhereInput | electionScalarWhereInput[]
  }

  export type poll_candidatesUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<poll_candidatesCreateWithoutUserInput, poll_candidatesUncheckedCreateWithoutUserInput> | poll_candidatesCreateWithoutUserInput[] | poll_candidatesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: poll_candidatesCreateOrConnectWithoutUserInput | poll_candidatesCreateOrConnectWithoutUserInput[]
    upsert?: poll_candidatesUpsertWithWhereUniqueWithoutUserInput | poll_candidatesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: poll_candidatesCreateManyUserInputEnvelope
    set?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
    disconnect?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
    delete?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
    connect?: poll_candidatesWhereUniqueInput | poll_candidatesWhereUniqueInput[]
    update?: poll_candidatesUpdateWithWhereUniqueWithoutUserInput | poll_candidatesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: poll_candidatesUpdateManyWithWhereWithoutUserInput | poll_candidatesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: poll_candidatesScalarWhereInput | poll_candidatesScalarWhereInput[]
  }

  export type takepartUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<takepartCreateWithoutUserInput, takepartUncheckedCreateWithoutUserInput> | takepartCreateWithoutUserInput[] | takepartUncheckedCreateWithoutUserInput[]
    connectOrCreate?: takepartCreateOrConnectWithoutUserInput | takepartCreateOrConnectWithoutUserInput[]
    upsert?: takepartUpsertWithWhereUniqueWithoutUserInput | takepartUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: takepartCreateManyUserInputEnvelope
    set?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
    disconnect?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
    delete?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
    connect?: takepartWhereUniqueInput | takepartWhereUniqueInput[]
    update?: takepartUpdateWithWhereUniqueWithoutUserInput | takepartUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: takepartUpdateManyWithWhereWithoutUserInput | takepartUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: takepartScalarWhereInput | takepartScalarWhereInput[]
  }

  export type VoteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput> | VoteCreateWithoutUserInput[] | VoteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutUserInput | VoteCreateOrConnectWithoutUserInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutUserInput | VoteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: VoteCreateManyUserInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutUserInput | VoteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutUserInput | VoteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type VoteUncheckedUpdateManyWithoutCandidateNestedInput = {
    create?: XOR<VoteCreateWithoutCandidateInput, VoteUncheckedCreateWithoutCandidateInput> | VoteCreateWithoutCandidateInput[] | VoteUncheckedCreateWithoutCandidateInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutCandidateInput | VoteCreateOrConnectWithoutCandidateInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutCandidateInput | VoteUpsertWithWhereUniqueWithoutCandidateInput[]
    createMany?: VoteCreateManyCandidateInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutCandidateInput | VoteUpdateWithWhereUniqueWithoutCandidateInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutCandidateInput | VoteUpdateManyWithWhereWithoutCandidateInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type userCreateNestedOneWithoutVotesInput = {
    create?: XOR<userCreateWithoutVotesInput, userUncheckedCreateWithoutVotesInput>
    connectOrCreate?: userCreateOrConnectWithoutVotesInput
    connect?: userWhereUniqueInput
  }

  export type electionCreateNestedOneWithoutVotesInput = {
    create?: XOR<electionCreateWithoutVotesInput, electionUncheckedCreateWithoutVotesInput>
    connectOrCreate?: electionCreateOrConnectWithoutVotesInput
    connect?: electionWhereUniqueInput
  }

  export type userCreateNestedOneWithoutCandidateVotesInput = {
    create?: XOR<userCreateWithoutCandidateVotesInput, userUncheckedCreateWithoutCandidateVotesInput>
    connectOrCreate?: userCreateOrConnectWithoutCandidateVotesInput
    connect?: userWhereUniqueInput
  }

  export type userUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<userCreateWithoutVotesInput, userUncheckedCreateWithoutVotesInput>
    connectOrCreate?: userCreateOrConnectWithoutVotesInput
    upsert?: userUpsertWithoutVotesInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutVotesInput, userUpdateWithoutVotesInput>, userUncheckedUpdateWithoutVotesInput>
  }

  export type electionUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<electionCreateWithoutVotesInput, electionUncheckedCreateWithoutVotesInput>
    connectOrCreate?: electionCreateOrConnectWithoutVotesInput
    upsert?: electionUpsertWithoutVotesInput
    connect?: electionWhereUniqueInput
    update?: XOR<XOR<electionUpdateToOneWithWhereWithoutVotesInput, electionUpdateWithoutVotesInput>, electionUncheckedUpdateWithoutVotesInput>
  }

  export type userUpdateOneRequiredWithoutCandidateVotesNestedInput = {
    create?: XOR<userCreateWithoutCandidateVotesInput, userUncheckedCreateWithoutCandidateVotesInput>
    connectOrCreate?: userCreateOrConnectWithoutCandidateVotesInput
    upsert?: userUpsertWithoutCandidateVotesInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutCandidateVotesInput, userUpdateWithoutCandidateVotesInput>, userUncheckedUpdateWithoutCandidateVotesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type userCreateWithoutElectionInput = {
    clerkId: string
    fullName: string
    username: string
    password: string
    isAdmin: boolean
    gender?: string | null
    email: string
    birthdate?: Date | string | null
    occupation?: string | null
    location?: string | null
    poll_candidates?: poll_candidatesCreateNestedManyWithoutUserInput
    takepart?: takepartCreateNestedManyWithoutUserInput
    votes?: VoteCreateNestedManyWithoutUserInput
    candidateVotes?: VoteCreateNestedManyWithoutCandidateInput
  }

  export type userUncheckedCreateWithoutElectionInput = {
    id?: number
    clerkId: string
    fullName: string
    username: string
    password: string
    isAdmin: boolean
    gender?: string | null
    email: string
    birthdate?: Date | string | null
    occupation?: string | null
    location?: string | null
    poll_candidates?: poll_candidatesUncheckedCreateNestedManyWithoutUserInput
    takepart?: takepartUncheckedCreateNestedManyWithoutUserInput
    votes?: VoteUncheckedCreateNestedManyWithoutUserInput
    candidateVotes?: VoteUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type userCreateOrConnectWithoutElectionInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutElectionInput, userUncheckedCreateWithoutElectionInput>
  }

  export type poll_candidatesCreateWithoutElectionInput = {
    invited_at?: Date | string
    user: userCreateNestedOneWithoutPoll_candidatesInput
  }

  export type poll_candidatesUncheckedCreateWithoutElectionInput = {
    id?: number
    user_id: number
    invited_at?: Date | string
  }

  export type poll_candidatesCreateOrConnectWithoutElectionInput = {
    where: poll_candidatesWhereUniqueInput
    create: XOR<poll_candidatesCreateWithoutElectionInput, poll_candidatesUncheckedCreateWithoutElectionInput>
  }

  export type poll_candidatesCreateManyElectionInputEnvelope = {
    data: poll_candidatesCreateManyElectionInput | poll_candidatesCreateManyElectionInput[]
    skipDuplicates?: boolean
  }

  export type takepartCreateWithoutElectionInput = {
    numberOfVotes: number
    user: userCreateNestedOneWithoutTakepartInput
  }

  export type takepartUncheckedCreateWithoutElectionInput = {
    candidateId: number
    numberOfVotes: number
  }

  export type takepartCreateOrConnectWithoutElectionInput = {
    where: takepartWhereUniqueInput
    create: XOR<takepartCreateWithoutElectionInput, takepartUncheckedCreateWithoutElectionInput>
  }

  export type takepartCreateManyElectionInputEnvelope = {
    data: takepartCreateManyElectionInput | takepartCreateManyElectionInput[]
    skipDuplicates?: boolean
  }

  export type VoteCreateWithoutElectionInput = {
    votedAt?: Date | string
    user: userCreateNestedOneWithoutVotesInput
    candidate: userCreateNestedOneWithoutCandidateVotesInput
  }

  export type VoteUncheckedCreateWithoutElectionInput = {
    id?: number
    userId: number
    candidateId: number
    votedAt?: Date | string
  }

  export type VoteCreateOrConnectWithoutElectionInput = {
    where: VoteWhereUniqueInput
    create: XOR<VoteCreateWithoutElectionInput, VoteUncheckedCreateWithoutElectionInput>
  }

  export type VoteCreateManyElectionInputEnvelope = {
    data: VoteCreateManyElectionInput | VoteCreateManyElectionInput[]
    skipDuplicates?: boolean
  }

  export type userUpsertWithoutElectionInput = {
    update: XOR<userUpdateWithoutElectionInput, userUncheckedUpdateWithoutElectionInput>
    create: XOR<userCreateWithoutElectionInput, userUncheckedCreateWithoutElectionInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutElectionInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutElectionInput, userUncheckedUpdateWithoutElectionInput>
  }

  export type userUpdateWithoutElectionInput = {
    clerkId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    poll_candidates?: poll_candidatesUpdateManyWithoutUserNestedInput
    takepart?: takepartUpdateManyWithoutUserNestedInput
    votes?: VoteUpdateManyWithoutUserNestedInput
    candidateVotes?: VoteUpdateManyWithoutCandidateNestedInput
  }

  export type userUncheckedUpdateWithoutElectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    clerkId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    poll_candidates?: poll_candidatesUncheckedUpdateManyWithoutUserNestedInput
    takepart?: takepartUncheckedUpdateManyWithoutUserNestedInput
    votes?: VoteUncheckedUpdateManyWithoutUserNestedInput
    candidateVotes?: VoteUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type poll_candidatesUpsertWithWhereUniqueWithoutElectionInput = {
    where: poll_candidatesWhereUniqueInput
    update: XOR<poll_candidatesUpdateWithoutElectionInput, poll_candidatesUncheckedUpdateWithoutElectionInput>
    create: XOR<poll_candidatesCreateWithoutElectionInput, poll_candidatesUncheckedCreateWithoutElectionInput>
  }

  export type poll_candidatesUpdateWithWhereUniqueWithoutElectionInput = {
    where: poll_candidatesWhereUniqueInput
    data: XOR<poll_candidatesUpdateWithoutElectionInput, poll_candidatesUncheckedUpdateWithoutElectionInput>
  }

  export type poll_candidatesUpdateManyWithWhereWithoutElectionInput = {
    where: poll_candidatesScalarWhereInput
    data: XOR<poll_candidatesUpdateManyMutationInput, poll_candidatesUncheckedUpdateManyWithoutElectionInput>
  }

  export type poll_candidatesScalarWhereInput = {
    AND?: poll_candidatesScalarWhereInput | poll_candidatesScalarWhereInput[]
    OR?: poll_candidatesScalarWhereInput[]
    NOT?: poll_candidatesScalarWhereInput | poll_candidatesScalarWhereInput[]
    id?: IntFilter<"poll_candidates"> | number
    poll_id?: IntFilter<"poll_candidates"> | number
    user_id?: IntFilter<"poll_candidates"> | number
    invited_at?: DateTimeFilter<"poll_candidates"> | Date | string
  }

  export type takepartUpsertWithWhereUniqueWithoutElectionInput = {
    where: takepartWhereUniqueInput
    update: XOR<takepartUpdateWithoutElectionInput, takepartUncheckedUpdateWithoutElectionInput>
    create: XOR<takepartCreateWithoutElectionInput, takepartUncheckedCreateWithoutElectionInput>
  }

  export type takepartUpdateWithWhereUniqueWithoutElectionInput = {
    where: takepartWhereUniqueInput
    data: XOR<takepartUpdateWithoutElectionInput, takepartUncheckedUpdateWithoutElectionInput>
  }

  export type takepartUpdateManyWithWhereWithoutElectionInput = {
    where: takepartScalarWhereInput
    data: XOR<takepartUpdateManyMutationInput, takepartUncheckedUpdateManyWithoutElectionInput>
  }

  export type takepartScalarWhereInput = {
    AND?: takepartScalarWhereInput | takepartScalarWhereInput[]
    OR?: takepartScalarWhereInput[]
    NOT?: takepartScalarWhereInput | takepartScalarWhereInput[]
    electionId?: IntFilter<"takepart"> | number
    candidateId?: IntFilter<"takepart"> | number
    numberOfVotes?: IntFilter<"takepart"> | number
  }

  export type VoteUpsertWithWhereUniqueWithoutElectionInput = {
    where: VoteWhereUniqueInput
    update: XOR<VoteUpdateWithoutElectionInput, VoteUncheckedUpdateWithoutElectionInput>
    create: XOR<VoteCreateWithoutElectionInput, VoteUncheckedCreateWithoutElectionInput>
  }

  export type VoteUpdateWithWhereUniqueWithoutElectionInput = {
    where: VoteWhereUniqueInput
    data: XOR<VoteUpdateWithoutElectionInput, VoteUncheckedUpdateWithoutElectionInput>
  }

  export type VoteUpdateManyWithWhereWithoutElectionInput = {
    where: VoteScalarWhereInput
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyWithoutElectionInput>
  }

  export type VoteScalarWhereInput = {
    AND?: VoteScalarWhereInput | VoteScalarWhereInput[]
    OR?: VoteScalarWhereInput[]
    NOT?: VoteScalarWhereInput | VoteScalarWhereInput[]
    id?: IntFilter<"Vote"> | number
    userId?: IntFilter<"Vote"> | number
    electionId?: IntFilter<"Vote"> | number
    candidateId?: IntFilter<"Vote"> | number
    votedAt?: DateTimeFilter<"Vote"> | Date | string
  }

  export type electionCreateWithoutPoll_candidatesInput = {
    title: string
    description?: string | null
    start_date: Date | string
    end_date: Date | string
    is_active: boolean
    target_occupation?: string | null
    target_location?: string | null
    birthdate_min?: Date | string | null
    birthdate_max?: Date | string | null
    target_gender?: string | null
    user: userCreateNestedOneWithoutElectionInput
    takepart?: takepartCreateNestedManyWithoutElectionInput
    votes?: VoteCreateNestedManyWithoutElectionInput
  }

  export type electionUncheckedCreateWithoutPoll_candidatesInput = {
    id?: number
    title: string
    description?: string | null
    start_date: Date | string
    end_date: Date | string
    is_active: boolean
    target_occupation?: string | null
    target_location?: string | null
    birthdate_min?: Date | string | null
    birthdate_max?: Date | string | null
    target_gender?: string | null
    userId: number
    takepart?: takepartUncheckedCreateNestedManyWithoutElectionInput
    votes?: VoteUncheckedCreateNestedManyWithoutElectionInput
  }

  export type electionCreateOrConnectWithoutPoll_candidatesInput = {
    where: electionWhereUniqueInput
    create: XOR<electionCreateWithoutPoll_candidatesInput, electionUncheckedCreateWithoutPoll_candidatesInput>
  }

  export type userCreateWithoutPoll_candidatesInput = {
    clerkId: string
    fullName: string
    username: string
    password: string
    isAdmin: boolean
    gender?: string | null
    email: string
    birthdate?: Date | string | null
    occupation?: string | null
    location?: string | null
    election?: electionCreateNestedManyWithoutUserInput
    takepart?: takepartCreateNestedManyWithoutUserInput
    votes?: VoteCreateNestedManyWithoutUserInput
    candidateVotes?: VoteCreateNestedManyWithoutCandidateInput
  }

  export type userUncheckedCreateWithoutPoll_candidatesInput = {
    id?: number
    clerkId: string
    fullName: string
    username: string
    password: string
    isAdmin: boolean
    gender?: string | null
    email: string
    birthdate?: Date | string | null
    occupation?: string | null
    location?: string | null
    election?: electionUncheckedCreateNestedManyWithoutUserInput
    takepart?: takepartUncheckedCreateNestedManyWithoutUserInput
    votes?: VoteUncheckedCreateNestedManyWithoutUserInput
    candidateVotes?: VoteUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type userCreateOrConnectWithoutPoll_candidatesInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutPoll_candidatesInput, userUncheckedCreateWithoutPoll_candidatesInput>
  }

  export type electionUpsertWithoutPoll_candidatesInput = {
    update: XOR<electionUpdateWithoutPoll_candidatesInput, electionUncheckedUpdateWithoutPoll_candidatesInput>
    create: XOR<electionCreateWithoutPoll_candidatesInput, electionUncheckedCreateWithoutPoll_candidatesInput>
    where?: electionWhereInput
  }

  export type electionUpdateToOneWithWhereWithoutPoll_candidatesInput = {
    where?: electionWhereInput
    data: XOR<electionUpdateWithoutPoll_candidatesInput, electionUncheckedUpdateWithoutPoll_candidatesInput>
  }

  export type electionUpdateWithoutPoll_candidatesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    target_occupation?: NullableStringFieldUpdateOperationsInput | string | null
    target_location?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate_min?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthdate_max?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    target_gender?: NullableStringFieldUpdateOperationsInput | string | null
    user?: userUpdateOneRequiredWithoutElectionNestedInput
    takepart?: takepartUpdateManyWithoutElectionNestedInput
    votes?: VoteUpdateManyWithoutElectionNestedInput
  }

  export type electionUncheckedUpdateWithoutPoll_candidatesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    target_occupation?: NullableStringFieldUpdateOperationsInput | string | null
    target_location?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate_min?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthdate_max?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    target_gender?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: IntFieldUpdateOperationsInput | number
    takepart?: takepartUncheckedUpdateManyWithoutElectionNestedInput
    votes?: VoteUncheckedUpdateManyWithoutElectionNestedInput
  }

  export type userUpsertWithoutPoll_candidatesInput = {
    update: XOR<userUpdateWithoutPoll_candidatesInput, userUncheckedUpdateWithoutPoll_candidatesInput>
    create: XOR<userCreateWithoutPoll_candidatesInput, userUncheckedCreateWithoutPoll_candidatesInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutPoll_candidatesInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutPoll_candidatesInput, userUncheckedUpdateWithoutPoll_candidatesInput>
  }

  export type userUpdateWithoutPoll_candidatesInput = {
    clerkId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    election?: electionUpdateManyWithoutUserNestedInput
    takepart?: takepartUpdateManyWithoutUserNestedInput
    votes?: VoteUpdateManyWithoutUserNestedInput
    candidateVotes?: VoteUpdateManyWithoutCandidateNestedInput
  }

  export type userUncheckedUpdateWithoutPoll_candidatesInput = {
    id?: IntFieldUpdateOperationsInput | number
    clerkId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    election?: electionUncheckedUpdateManyWithoutUserNestedInput
    takepart?: takepartUncheckedUpdateManyWithoutUserNestedInput
    votes?: VoteUncheckedUpdateManyWithoutUserNestedInput
    candidateVotes?: VoteUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type userCreateWithoutTakepartInput = {
    clerkId: string
    fullName: string
    username: string
    password: string
    isAdmin: boolean
    gender?: string | null
    email: string
    birthdate?: Date | string | null
    occupation?: string | null
    location?: string | null
    election?: electionCreateNestedManyWithoutUserInput
    poll_candidates?: poll_candidatesCreateNestedManyWithoutUserInput
    votes?: VoteCreateNestedManyWithoutUserInput
    candidateVotes?: VoteCreateNestedManyWithoutCandidateInput
  }

  export type userUncheckedCreateWithoutTakepartInput = {
    id?: number
    clerkId: string
    fullName: string
    username: string
    password: string
    isAdmin: boolean
    gender?: string | null
    email: string
    birthdate?: Date | string | null
    occupation?: string | null
    location?: string | null
    election?: electionUncheckedCreateNestedManyWithoutUserInput
    poll_candidates?: poll_candidatesUncheckedCreateNestedManyWithoutUserInput
    votes?: VoteUncheckedCreateNestedManyWithoutUserInput
    candidateVotes?: VoteUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type userCreateOrConnectWithoutTakepartInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutTakepartInput, userUncheckedCreateWithoutTakepartInput>
  }

  export type electionCreateWithoutTakepartInput = {
    title: string
    description?: string | null
    start_date: Date | string
    end_date: Date | string
    is_active: boolean
    target_occupation?: string | null
    target_location?: string | null
    birthdate_min?: Date | string | null
    birthdate_max?: Date | string | null
    target_gender?: string | null
    user: userCreateNestedOneWithoutElectionInput
    poll_candidates?: poll_candidatesCreateNestedManyWithoutElectionInput
    votes?: VoteCreateNestedManyWithoutElectionInput
  }

  export type electionUncheckedCreateWithoutTakepartInput = {
    id?: number
    title: string
    description?: string | null
    start_date: Date | string
    end_date: Date | string
    is_active: boolean
    target_occupation?: string | null
    target_location?: string | null
    birthdate_min?: Date | string | null
    birthdate_max?: Date | string | null
    target_gender?: string | null
    userId: number
    poll_candidates?: poll_candidatesUncheckedCreateNestedManyWithoutElectionInput
    votes?: VoteUncheckedCreateNestedManyWithoutElectionInput
  }

  export type electionCreateOrConnectWithoutTakepartInput = {
    where: electionWhereUniqueInput
    create: XOR<electionCreateWithoutTakepartInput, electionUncheckedCreateWithoutTakepartInput>
  }

  export type userUpsertWithoutTakepartInput = {
    update: XOR<userUpdateWithoutTakepartInput, userUncheckedUpdateWithoutTakepartInput>
    create: XOR<userCreateWithoutTakepartInput, userUncheckedCreateWithoutTakepartInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutTakepartInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutTakepartInput, userUncheckedUpdateWithoutTakepartInput>
  }

  export type userUpdateWithoutTakepartInput = {
    clerkId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    election?: electionUpdateManyWithoutUserNestedInput
    poll_candidates?: poll_candidatesUpdateManyWithoutUserNestedInput
    votes?: VoteUpdateManyWithoutUserNestedInput
    candidateVotes?: VoteUpdateManyWithoutCandidateNestedInput
  }

  export type userUncheckedUpdateWithoutTakepartInput = {
    id?: IntFieldUpdateOperationsInput | number
    clerkId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    election?: electionUncheckedUpdateManyWithoutUserNestedInput
    poll_candidates?: poll_candidatesUncheckedUpdateManyWithoutUserNestedInput
    votes?: VoteUncheckedUpdateManyWithoutUserNestedInput
    candidateVotes?: VoteUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type electionUpsertWithoutTakepartInput = {
    update: XOR<electionUpdateWithoutTakepartInput, electionUncheckedUpdateWithoutTakepartInput>
    create: XOR<electionCreateWithoutTakepartInput, electionUncheckedCreateWithoutTakepartInput>
    where?: electionWhereInput
  }

  export type electionUpdateToOneWithWhereWithoutTakepartInput = {
    where?: electionWhereInput
    data: XOR<electionUpdateWithoutTakepartInput, electionUncheckedUpdateWithoutTakepartInput>
  }

  export type electionUpdateWithoutTakepartInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    target_occupation?: NullableStringFieldUpdateOperationsInput | string | null
    target_location?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate_min?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthdate_max?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    target_gender?: NullableStringFieldUpdateOperationsInput | string | null
    user?: userUpdateOneRequiredWithoutElectionNestedInput
    poll_candidates?: poll_candidatesUpdateManyWithoutElectionNestedInput
    votes?: VoteUpdateManyWithoutElectionNestedInput
  }

  export type electionUncheckedUpdateWithoutTakepartInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    target_occupation?: NullableStringFieldUpdateOperationsInput | string | null
    target_location?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate_min?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthdate_max?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    target_gender?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: IntFieldUpdateOperationsInput | number
    poll_candidates?: poll_candidatesUncheckedUpdateManyWithoutElectionNestedInput
    votes?: VoteUncheckedUpdateManyWithoutElectionNestedInput
  }

  export type electionCreateWithoutUserInput = {
    title: string
    description?: string | null
    start_date: Date | string
    end_date: Date | string
    is_active: boolean
    target_occupation?: string | null
    target_location?: string | null
    birthdate_min?: Date | string | null
    birthdate_max?: Date | string | null
    target_gender?: string | null
    poll_candidates?: poll_candidatesCreateNestedManyWithoutElectionInput
    takepart?: takepartCreateNestedManyWithoutElectionInput
    votes?: VoteCreateNestedManyWithoutElectionInput
  }

  export type electionUncheckedCreateWithoutUserInput = {
    id?: number
    title: string
    description?: string | null
    start_date: Date | string
    end_date: Date | string
    is_active: boolean
    target_occupation?: string | null
    target_location?: string | null
    birthdate_min?: Date | string | null
    birthdate_max?: Date | string | null
    target_gender?: string | null
    poll_candidates?: poll_candidatesUncheckedCreateNestedManyWithoutElectionInput
    takepart?: takepartUncheckedCreateNestedManyWithoutElectionInput
    votes?: VoteUncheckedCreateNestedManyWithoutElectionInput
  }

  export type electionCreateOrConnectWithoutUserInput = {
    where: electionWhereUniqueInput
    create: XOR<electionCreateWithoutUserInput, electionUncheckedCreateWithoutUserInput>
  }

  export type electionCreateManyUserInputEnvelope = {
    data: electionCreateManyUserInput | electionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type poll_candidatesCreateWithoutUserInput = {
    invited_at?: Date | string
    election: electionCreateNestedOneWithoutPoll_candidatesInput
  }

  export type poll_candidatesUncheckedCreateWithoutUserInput = {
    id?: number
    poll_id: number
    invited_at?: Date | string
  }

  export type poll_candidatesCreateOrConnectWithoutUserInput = {
    where: poll_candidatesWhereUniqueInput
    create: XOR<poll_candidatesCreateWithoutUserInput, poll_candidatesUncheckedCreateWithoutUserInput>
  }

  export type poll_candidatesCreateManyUserInputEnvelope = {
    data: poll_candidatesCreateManyUserInput | poll_candidatesCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type takepartCreateWithoutUserInput = {
    numberOfVotes: number
    election: electionCreateNestedOneWithoutTakepartInput
  }

  export type takepartUncheckedCreateWithoutUserInput = {
    electionId: number
    numberOfVotes: number
  }

  export type takepartCreateOrConnectWithoutUserInput = {
    where: takepartWhereUniqueInput
    create: XOR<takepartCreateWithoutUserInput, takepartUncheckedCreateWithoutUserInput>
  }

  export type takepartCreateManyUserInputEnvelope = {
    data: takepartCreateManyUserInput | takepartCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VoteCreateWithoutUserInput = {
    votedAt?: Date | string
    election: electionCreateNestedOneWithoutVotesInput
    candidate: userCreateNestedOneWithoutCandidateVotesInput
  }

  export type VoteUncheckedCreateWithoutUserInput = {
    id?: number
    electionId: number
    candidateId: number
    votedAt?: Date | string
  }

  export type VoteCreateOrConnectWithoutUserInput = {
    where: VoteWhereUniqueInput
    create: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput>
  }

  export type VoteCreateManyUserInputEnvelope = {
    data: VoteCreateManyUserInput | VoteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type VoteCreateWithoutCandidateInput = {
    votedAt?: Date | string
    user: userCreateNestedOneWithoutVotesInput
    election: electionCreateNestedOneWithoutVotesInput
  }

  export type VoteUncheckedCreateWithoutCandidateInput = {
    id?: number
    userId: number
    electionId: number
    votedAt?: Date | string
  }

  export type VoteCreateOrConnectWithoutCandidateInput = {
    where: VoteWhereUniqueInput
    create: XOR<VoteCreateWithoutCandidateInput, VoteUncheckedCreateWithoutCandidateInput>
  }

  export type VoteCreateManyCandidateInputEnvelope = {
    data: VoteCreateManyCandidateInput | VoteCreateManyCandidateInput[]
    skipDuplicates?: boolean
  }

  export type electionUpsertWithWhereUniqueWithoutUserInput = {
    where: electionWhereUniqueInput
    update: XOR<electionUpdateWithoutUserInput, electionUncheckedUpdateWithoutUserInput>
    create: XOR<electionCreateWithoutUserInput, electionUncheckedCreateWithoutUserInput>
  }

  export type electionUpdateWithWhereUniqueWithoutUserInput = {
    where: electionWhereUniqueInput
    data: XOR<electionUpdateWithoutUserInput, electionUncheckedUpdateWithoutUserInput>
  }

  export type electionUpdateManyWithWhereWithoutUserInput = {
    where: electionScalarWhereInput
    data: XOR<electionUpdateManyMutationInput, electionUncheckedUpdateManyWithoutUserInput>
  }

  export type electionScalarWhereInput = {
    AND?: electionScalarWhereInput | electionScalarWhereInput[]
    OR?: electionScalarWhereInput[]
    NOT?: electionScalarWhereInput | electionScalarWhereInput[]
    id?: IntFilter<"election"> | number
    title?: StringFilter<"election"> | string
    description?: StringNullableFilter<"election"> | string | null
    start_date?: DateTimeFilter<"election"> | Date | string
    end_date?: DateTimeFilter<"election"> | Date | string
    is_active?: BoolFilter<"election"> | boolean
    target_occupation?: StringNullableFilter<"election"> | string | null
    target_location?: StringNullableFilter<"election"> | string | null
    birthdate_min?: DateTimeNullableFilter<"election"> | Date | string | null
    birthdate_max?: DateTimeNullableFilter<"election"> | Date | string | null
    target_gender?: StringNullableFilter<"election"> | string | null
    userId?: IntFilter<"election"> | number
  }

  export type poll_candidatesUpsertWithWhereUniqueWithoutUserInput = {
    where: poll_candidatesWhereUniqueInput
    update: XOR<poll_candidatesUpdateWithoutUserInput, poll_candidatesUncheckedUpdateWithoutUserInput>
    create: XOR<poll_candidatesCreateWithoutUserInput, poll_candidatesUncheckedCreateWithoutUserInput>
  }

  export type poll_candidatesUpdateWithWhereUniqueWithoutUserInput = {
    where: poll_candidatesWhereUniqueInput
    data: XOR<poll_candidatesUpdateWithoutUserInput, poll_candidatesUncheckedUpdateWithoutUserInput>
  }

  export type poll_candidatesUpdateManyWithWhereWithoutUserInput = {
    where: poll_candidatesScalarWhereInput
    data: XOR<poll_candidatesUpdateManyMutationInput, poll_candidatesUncheckedUpdateManyWithoutUserInput>
  }

  export type takepartUpsertWithWhereUniqueWithoutUserInput = {
    where: takepartWhereUniqueInput
    update: XOR<takepartUpdateWithoutUserInput, takepartUncheckedUpdateWithoutUserInput>
    create: XOR<takepartCreateWithoutUserInput, takepartUncheckedCreateWithoutUserInput>
  }

  export type takepartUpdateWithWhereUniqueWithoutUserInput = {
    where: takepartWhereUniqueInput
    data: XOR<takepartUpdateWithoutUserInput, takepartUncheckedUpdateWithoutUserInput>
  }

  export type takepartUpdateManyWithWhereWithoutUserInput = {
    where: takepartScalarWhereInput
    data: XOR<takepartUpdateManyMutationInput, takepartUncheckedUpdateManyWithoutUserInput>
  }

  export type VoteUpsertWithWhereUniqueWithoutUserInput = {
    where: VoteWhereUniqueInput
    update: XOR<VoteUpdateWithoutUserInput, VoteUncheckedUpdateWithoutUserInput>
    create: XOR<VoteCreateWithoutUserInput, VoteUncheckedCreateWithoutUserInput>
  }

  export type VoteUpdateWithWhereUniqueWithoutUserInput = {
    where: VoteWhereUniqueInput
    data: XOR<VoteUpdateWithoutUserInput, VoteUncheckedUpdateWithoutUserInput>
  }

  export type VoteUpdateManyWithWhereWithoutUserInput = {
    where: VoteScalarWhereInput
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyWithoutUserInput>
  }

  export type VoteUpsertWithWhereUniqueWithoutCandidateInput = {
    where: VoteWhereUniqueInput
    update: XOR<VoteUpdateWithoutCandidateInput, VoteUncheckedUpdateWithoutCandidateInput>
    create: XOR<VoteCreateWithoutCandidateInput, VoteUncheckedCreateWithoutCandidateInput>
  }

  export type VoteUpdateWithWhereUniqueWithoutCandidateInput = {
    where: VoteWhereUniqueInput
    data: XOR<VoteUpdateWithoutCandidateInput, VoteUncheckedUpdateWithoutCandidateInput>
  }

  export type VoteUpdateManyWithWhereWithoutCandidateInput = {
    where: VoteScalarWhereInput
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyWithoutCandidateInput>
  }

  export type userCreateWithoutVotesInput = {
    clerkId: string
    fullName: string
    username: string
    password: string
    isAdmin: boolean
    gender?: string | null
    email: string
    birthdate?: Date | string | null
    occupation?: string | null
    location?: string | null
    election?: electionCreateNestedManyWithoutUserInput
    poll_candidates?: poll_candidatesCreateNestedManyWithoutUserInput
    takepart?: takepartCreateNestedManyWithoutUserInput
    candidateVotes?: VoteCreateNestedManyWithoutCandidateInput
  }

  export type userUncheckedCreateWithoutVotesInput = {
    id?: number
    clerkId: string
    fullName: string
    username: string
    password: string
    isAdmin: boolean
    gender?: string | null
    email: string
    birthdate?: Date | string | null
    occupation?: string | null
    location?: string | null
    election?: electionUncheckedCreateNestedManyWithoutUserInput
    poll_candidates?: poll_candidatesUncheckedCreateNestedManyWithoutUserInput
    takepart?: takepartUncheckedCreateNestedManyWithoutUserInput
    candidateVotes?: VoteUncheckedCreateNestedManyWithoutCandidateInput
  }

  export type userCreateOrConnectWithoutVotesInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutVotesInput, userUncheckedCreateWithoutVotesInput>
  }

  export type electionCreateWithoutVotesInput = {
    title: string
    description?: string | null
    start_date: Date | string
    end_date: Date | string
    is_active: boolean
    target_occupation?: string | null
    target_location?: string | null
    birthdate_min?: Date | string | null
    birthdate_max?: Date | string | null
    target_gender?: string | null
    user: userCreateNestedOneWithoutElectionInput
    poll_candidates?: poll_candidatesCreateNestedManyWithoutElectionInput
    takepart?: takepartCreateNestedManyWithoutElectionInput
  }

  export type electionUncheckedCreateWithoutVotesInput = {
    id?: number
    title: string
    description?: string | null
    start_date: Date | string
    end_date: Date | string
    is_active: boolean
    target_occupation?: string | null
    target_location?: string | null
    birthdate_min?: Date | string | null
    birthdate_max?: Date | string | null
    target_gender?: string | null
    userId: number
    poll_candidates?: poll_candidatesUncheckedCreateNestedManyWithoutElectionInput
    takepart?: takepartUncheckedCreateNestedManyWithoutElectionInput
  }

  export type electionCreateOrConnectWithoutVotesInput = {
    where: electionWhereUniqueInput
    create: XOR<electionCreateWithoutVotesInput, electionUncheckedCreateWithoutVotesInput>
  }

  export type userCreateWithoutCandidateVotesInput = {
    clerkId: string
    fullName: string
    username: string
    password: string
    isAdmin: boolean
    gender?: string | null
    email: string
    birthdate?: Date | string | null
    occupation?: string | null
    location?: string | null
    election?: electionCreateNestedManyWithoutUserInput
    poll_candidates?: poll_candidatesCreateNestedManyWithoutUserInput
    takepart?: takepartCreateNestedManyWithoutUserInput
    votes?: VoteCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutCandidateVotesInput = {
    id?: number
    clerkId: string
    fullName: string
    username: string
    password: string
    isAdmin: boolean
    gender?: string | null
    email: string
    birthdate?: Date | string | null
    occupation?: string | null
    location?: string | null
    election?: electionUncheckedCreateNestedManyWithoutUserInput
    poll_candidates?: poll_candidatesUncheckedCreateNestedManyWithoutUserInput
    takepart?: takepartUncheckedCreateNestedManyWithoutUserInput
    votes?: VoteUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutCandidateVotesInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutCandidateVotesInput, userUncheckedCreateWithoutCandidateVotesInput>
  }

  export type userUpsertWithoutVotesInput = {
    update: XOR<userUpdateWithoutVotesInput, userUncheckedUpdateWithoutVotesInput>
    create: XOR<userCreateWithoutVotesInput, userUncheckedCreateWithoutVotesInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutVotesInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutVotesInput, userUncheckedUpdateWithoutVotesInput>
  }

  export type userUpdateWithoutVotesInput = {
    clerkId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    election?: electionUpdateManyWithoutUserNestedInput
    poll_candidates?: poll_candidatesUpdateManyWithoutUserNestedInput
    takepart?: takepartUpdateManyWithoutUserNestedInput
    candidateVotes?: VoteUpdateManyWithoutCandidateNestedInput
  }

  export type userUncheckedUpdateWithoutVotesInput = {
    id?: IntFieldUpdateOperationsInput | number
    clerkId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    election?: electionUncheckedUpdateManyWithoutUserNestedInput
    poll_candidates?: poll_candidatesUncheckedUpdateManyWithoutUserNestedInput
    takepart?: takepartUncheckedUpdateManyWithoutUserNestedInput
    candidateVotes?: VoteUncheckedUpdateManyWithoutCandidateNestedInput
  }

  export type electionUpsertWithoutVotesInput = {
    update: XOR<electionUpdateWithoutVotesInput, electionUncheckedUpdateWithoutVotesInput>
    create: XOR<electionCreateWithoutVotesInput, electionUncheckedCreateWithoutVotesInput>
    where?: electionWhereInput
  }

  export type electionUpdateToOneWithWhereWithoutVotesInput = {
    where?: electionWhereInput
    data: XOR<electionUpdateWithoutVotesInput, electionUncheckedUpdateWithoutVotesInput>
  }

  export type electionUpdateWithoutVotesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    target_occupation?: NullableStringFieldUpdateOperationsInput | string | null
    target_location?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate_min?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthdate_max?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    target_gender?: NullableStringFieldUpdateOperationsInput | string | null
    user?: userUpdateOneRequiredWithoutElectionNestedInput
    poll_candidates?: poll_candidatesUpdateManyWithoutElectionNestedInput
    takepart?: takepartUpdateManyWithoutElectionNestedInput
  }

  export type electionUncheckedUpdateWithoutVotesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    target_occupation?: NullableStringFieldUpdateOperationsInput | string | null
    target_location?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate_min?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthdate_max?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    target_gender?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: IntFieldUpdateOperationsInput | number
    poll_candidates?: poll_candidatesUncheckedUpdateManyWithoutElectionNestedInput
    takepart?: takepartUncheckedUpdateManyWithoutElectionNestedInput
  }

  export type userUpsertWithoutCandidateVotesInput = {
    update: XOR<userUpdateWithoutCandidateVotesInput, userUncheckedUpdateWithoutCandidateVotesInput>
    create: XOR<userCreateWithoutCandidateVotesInput, userUncheckedCreateWithoutCandidateVotesInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutCandidateVotesInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutCandidateVotesInput, userUncheckedUpdateWithoutCandidateVotesInput>
  }

  export type userUpdateWithoutCandidateVotesInput = {
    clerkId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    election?: electionUpdateManyWithoutUserNestedInput
    poll_candidates?: poll_candidatesUpdateManyWithoutUserNestedInput
    takepart?: takepartUpdateManyWithoutUserNestedInput
    votes?: VoteUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutCandidateVotesInput = {
    id?: IntFieldUpdateOperationsInput | number
    clerkId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    election?: electionUncheckedUpdateManyWithoutUserNestedInput
    poll_candidates?: poll_candidatesUncheckedUpdateManyWithoutUserNestedInput
    takepart?: takepartUncheckedUpdateManyWithoutUserNestedInput
    votes?: VoteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type poll_candidatesCreateManyElectionInput = {
    id?: number
    user_id: number
    invited_at?: Date | string
  }

  export type takepartCreateManyElectionInput = {
    candidateId: number
    numberOfVotes: number
  }

  export type VoteCreateManyElectionInput = {
    id?: number
    userId: number
    candidateId: number
    votedAt?: Date | string
  }

  export type poll_candidatesUpdateWithoutElectionInput = {
    invited_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateOneRequiredWithoutPoll_candidatesNestedInput
  }

  export type poll_candidatesUncheckedUpdateWithoutElectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    invited_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type poll_candidatesUncheckedUpdateManyWithoutElectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    invited_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type takepartUpdateWithoutElectionInput = {
    numberOfVotes?: IntFieldUpdateOperationsInput | number
    user?: userUpdateOneRequiredWithoutTakepartNestedInput
  }

  export type takepartUncheckedUpdateWithoutElectionInput = {
    candidateId?: IntFieldUpdateOperationsInput | number
    numberOfVotes?: IntFieldUpdateOperationsInput | number
  }

  export type takepartUncheckedUpdateManyWithoutElectionInput = {
    candidateId?: IntFieldUpdateOperationsInput | number
    numberOfVotes?: IntFieldUpdateOperationsInput | number
  }

  export type VoteUpdateWithoutElectionInput = {
    votedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateOneRequiredWithoutVotesNestedInput
    candidate?: userUpdateOneRequiredWithoutCandidateVotesNestedInput
  }

  export type VoteUncheckedUpdateWithoutElectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    candidateId?: IntFieldUpdateOperationsInput | number
    votedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteUncheckedUpdateManyWithoutElectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    candidateId?: IntFieldUpdateOperationsInput | number
    votedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type electionCreateManyUserInput = {
    id?: number
    title: string
    description?: string | null
    start_date: Date | string
    end_date: Date | string
    is_active: boolean
    target_occupation?: string | null
    target_location?: string | null
    birthdate_min?: Date | string | null
    birthdate_max?: Date | string | null
    target_gender?: string | null
  }

  export type poll_candidatesCreateManyUserInput = {
    id?: number
    poll_id: number
    invited_at?: Date | string
  }

  export type takepartCreateManyUserInput = {
    electionId: number
    numberOfVotes: number
  }

  export type VoteCreateManyUserInput = {
    id?: number
    electionId: number
    candidateId: number
    votedAt?: Date | string
  }

  export type VoteCreateManyCandidateInput = {
    id?: number
    userId: number
    electionId: number
    votedAt?: Date | string
  }

  export type electionUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    target_occupation?: NullableStringFieldUpdateOperationsInput | string | null
    target_location?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate_min?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthdate_max?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    target_gender?: NullableStringFieldUpdateOperationsInput | string | null
    poll_candidates?: poll_candidatesUpdateManyWithoutElectionNestedInput
    takepart?: takepartUpdateManyWithoutElectionNestedInput
    votes?: VoteUpdateManyWithoutElectionNestedInput
  }

  export type electionUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    target_occupation?: NullableStringFieldUpdateOperationsInput | string | null
    target_location?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate_min?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthdate_max?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    target_gender?: NullableStringFieldUpdateOperationsInput | string | null
    poll_candidates?: poll_candidatesUncheckedUpdateManyWithoutElectionNestedInput
    takepart?: takepartUncheckedUpdateManyWithoutElectionNestedInput
    votes?: VoteUncheckedUpdateManyWithoutElectionNestedInput
  }

  export type electionUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    target_occupation?: NullableStringFieldUpdateOperationsInput | string | null
    target_location?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate_min?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    birthdate_max?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    target_gender?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type poll_candidatesUpdateWithoutUserInput = {
    invited_at?: DateTimeFieldUpdateOperationsInput | Date | string
    election?: electionUpdateOneRequiredWithoutPoll_candidatesNestedInput
  }

  export type poll_candidatesUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    poll_id?: IntFieldUpdateOperationsInput | number
    invited_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type poll_candidatesUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    poll_id?: IntFieldUpdateOperationsInput | number
    invited_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type takepartUpdateWithoutUserInput = {
    numberOfVotes?: IntFieldUpdateOperationsInput | number
    election?: electionUpdateOneRequiredWithoutTakepartNestedInput
  }

  export type takepartUncheckedUpdateWithoutUserInput = {
    electionId?: IntFieldUpdateOperationsInput | number
    numberOfVotes?: IntFieldUpdateOperationsInput | number
  }

  export type takepartUncheckedUpdateManyWithoutUserInput = {
    electionId?: IntFieldUpdateOperationsInput | number
    numberOfVotes?: IntFieldUpdateOperationsInput | number
  }

  export type VoteUpdateWithoutUserInput = {
    votedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    election?: electionUpdateOneRequiredWithoutVotesNestedInput
    candidate?: userUpdateOneRequiredWithoutCandidateVotesNestedInput
  }

  export type VoteUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    electionId?: IntFieldUpdateOperationsInput | number
    candidateId?: IntFieldUpdateOperationsInput | number
    votedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    electionId?: IntFieldUpdateOperationsInput | number
    candidateId?: IntFieldUpdateOperationsInput | number
    votedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteUpdateWithoutCandidateInput = {
    votedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateOneRequiredWithoutVotesNestedInput
    election?: electionUpdateOneRequiredWithoutVotesNestedInput
  }

  export type VoteUncheckedUpdateWithoutCandidateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    electionId?: IntFieldUpdateOperationsInput | number
    votedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteUncheckedUpdateManyWithoutCandidateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    electionId?: IntFieldUpdateOperationsInput | number
    votedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}