module.exports = {
        remainingDays(job) {
                // cálculo de tempo restante
                const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

                const createdDate = new Date(job.createdAt);
                const dueDay = createdDate.getDate() + Number(remainingDays);
                const dueDateInMs = createdDate.setDate(dueDay);

                const timeDiffInMs = dueDateInMs - Date.now();
                // transformar ms em dias
                const dayInMs = 1000 * 60 * 60 * 24;
                const dayDiff = Math.floor(timeDiffInMs / dayInMs);

                // restam tantos dias...
                return dayDiff;
        },

        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
};