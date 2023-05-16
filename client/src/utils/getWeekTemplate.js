

export const getWeekTemplate = (weekDates,shiftDataTemplate)=>{
    const week = []
        for (let i = 0; i < 7; i++) {
            const dayData = []
            for (let i = 0; i < 3; i++) {
                dayData.push({
                    shiftDataTemplate
                })
            }
            const day = {
                    date: weekDates[i],     
                    data: dayData,
            }
            week.push(day)
        }
        console.log(week);
        return week
}