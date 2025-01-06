export interface IMapper<T, U> {
    mapFrom(param: T): U;
    mapTo(param: U): T;
}
