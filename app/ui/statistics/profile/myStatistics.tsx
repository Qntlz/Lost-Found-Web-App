import DataCounter from "./counter";

export default function MyStats() {
    return (
        <div className="grid grid-cols-2">
            <DataCounter count={235} title="Total Post" />
            <DataCounter count={235} title="Marked as Found" />
            <DataCounter count={235} title="Marked as Lost" />
            <DataCounter count={235} title="Total Views" /> 

        </div>
    );
}