// docs: https://developers.google.com/chart/interactive/docs/gallery/linechart
import Chart from "react-google-charts"
import { memo, useContext, useMemo } from "react"
import { AppContext } from "@/context/AppContext"

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
] as const

function LineG2({
    data,
    data2,
    subjects,
    year
}: { data: number[]; data2: number[]; subjects: [string, string]; year: number }) {
    const { bodyBgColor, darkTheme } = useContext(AppContext)

    const currentMonthIndex = new Date().getMonth() // Get current month index (0-11)
    const currentYear = new Date().getFullYear()

    const chartData = useMemo(() => {
        const shouldLimitMonths = year === currentYear // Only limit months if it's current year
        const monthsToShow = shouldLimitMonths ? months.slice(0, currentMonthIndex + 1) : months

        return [
            ["Month", subjects[0], subjects[1]],
            ...monthsToShow.map((month, index) => [
                month,
                data[index] ?? null,
                data2[index] ?? null
            ])
        ]
    }, [data, data2, subjects, currentMonthIndex, currentYear, year]) // Added currentMonthIndex to dependencies

    const chartOptions = useMemo(
        () => ({
            backgroundColor: bodyBgColor,
            legend: {
                textStyle: {
                    color: darkTheme ? "white" : "black",
                    fontSize: "14px"
                }
            },
            vAxes: {
                0: {
                    title: "",
                    textStyle: {
                        color: darkTheme ? "lightblue" : "#3366cc"
                    },
                    titleTextStyle: {
                        color: darkTheme ? "white" : "black"
                    }
                },
                1: {
                    title: "",
                    textStyle: { color: darkTheme ? "pink" : "#dc3912" },
                    titleTextStyle: {
                        color: darkTheme ? "white" : "black"
                    }
                }
            },
            hAxis: {
                textStyle: { color: darkTheme ? "white" : "black" },
                showTextEvery: 3
            },
            series: {
                0: { targetAxisIndex: 0 },
                1: { targetAxisIndex: 1 }
            },
            chartArea: { left: 17, right: 40 }
        }),
        [bodyBgColor, darkTheme]
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

export default memo(LineG2)
