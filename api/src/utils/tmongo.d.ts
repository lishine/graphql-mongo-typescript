export type IsRequired<T> = undefined extends T ? false : true

export type FieldType<T> = T extends number ? typeof Number : T extends string ? typeof String : Object

export type Field<T> = {
    type: FieldType<T>
    required: IsRequired<T>
    enum?: Array<T>
    ref?: string
}

export type ModelDefinition<M> = {
    [P in keyof M]-?: M[P] extends Array<infer U> ? Array<Field<U>> : Field<M[P]>
}
