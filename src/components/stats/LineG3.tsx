// docs: https://developers.google.com/chart/interactive/docs/gallery/linechart
import Chart from "react-google-charts"
import { memo, useContext, useMemo } from "react"
import { AppContext } from "@/context/AppContext"

function LineG3({ data }: { data: number[] }) {
    const { bodyBgColor, darkTheme } = useContext(AppContext)

    const chartData = useMemo(() => {
        const result: Array<[number | string, number | string]> = [
            ["Days from start to finish", "Finished books per days per book"],
        ]

        for (let i = 0; i < data.length; i++) {
            data[i] !== undefined && result.push([i, data[i]])
        }
        return result
    }, [data])

    const chartOptions = useMemo(
        () => ({
            backgroundColor: bodyBgColor,
            curveType: "function",
            legend: {
                position: "top",
                textStyle: {
                    color: darkTheme ? "white" : "black",
                    fontSize: "14px",
                },
            },
            hAxis: {
                title: "Days per book",
                titleTextStyle: {
                    color: darkTheme ? "white" : "black",
                },
                textStyle: { color: darkTheme ? "white" : "black" },
                gridlines: {
                    count: 0,
                },
            },
            vAxis: {
                title: "Finished books",
                titleTextStyle: {
                    color: darkTheme ? "white" : "black",
                },
                textStyle: { color: darkTheme ? "white" : "black" },
            },
            colors: ["#ff5f00"],
            chartArea: { left: 40, right: 30 },
            pointSize: 5,
        }),
        [bodyBgColor, darkTheme],
    )

    return (
        <Chart
            chartType="LineChart"
            data={chartData}
            height="300px"
            options={chartOptions}
            width="100%"
        />
    )
}
export default memo(LineG3)
