export interface IMapper<T, U> {
    mapFrom(param: U): T;
    mapTo(param: T): U;
}
