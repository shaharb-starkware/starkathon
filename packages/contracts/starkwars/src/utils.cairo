#[generate_trait]
pub impl SpanExtImpl<T, +PartialEq<T>, +Drop<T>, +Copy<T>> of SpanExtTrait<T> {
    fn contains(self: Span<T>, target: T) -> bool {
        let mut found = false;
        for element in self {
            if *element == target {
                found = true;
                break;
            };
        };
        found
    }
}