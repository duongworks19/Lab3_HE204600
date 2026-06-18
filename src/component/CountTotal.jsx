import { memo } from "react";

const CountTotal = memo(function CountTotal({ count }) {
    return (
        <p>Total students: <strong>{count}</strong></p>
    );
});

export default CountTotal;
