const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const profile = {
        name: "Rafael",
        avatar: "https://github.com/rafa7w.png",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
};

const Job = {
        data: [
                {
                        id: 1,
                        name: "Pizzaria Guloso",
                        "daily-hours": 2,
                        "total-hours": 60,
                        createdAt: Date.now()
                },
                {
                        id: 2,
                        name: "OneTwo Project",
                        "daily-hours": 3,
                        "total-hours": 47,
                        createdAt: Date.now()
                }
        ],

        controllers: {
                index(req, res) {
                        const updatedJobs = Job.data.map((job) => {
                                // ajustes no job    
                                const remaining = Job.services.remainingDays(job);
                                status = remaining <= 0 ? "done" : "progress";
                        
                                return {
                                        ...job,
                                        remaining,
                                        status,
                                        budget: profile["value-hour"] * job["total-hours"]
                                };
                        });
                        
                        return res.render(views + "index", { jobs: updatedJobs });
                },

                create(req, res) {
                        return res.render(views + "job");
                },

                save(req, res) {
                        // { name: "James", "daily-hours": "3.1", "total-hours": "3" }
                        const lastId = Job.data[Job.data.length - 1]?.id || 1;

                        jobs.push({
                                id: lastId + 1,
                                name: req.body.name,
                                "daily-hours": req.body["daily-hours"],
                                "total-hours": req.body["total-hours"],
                                createdAt: Date.now()
                        });
                        return res.redirect("/");
                }
        },
        
        services: {
                remainingDays(job) {
                        // cálculo de tempo restante
                        const remainingDays =   (job["total-hours"] / job["daily-hours"]).toFixed();
                        
                        const createdDate = new Date(job.createdAt);
                        const dueDay = createdDate.getDate() + Number(remainingDays);
                        const dueDateInMs = createdDate.setDate(dueDay);
                        
                        const timeDiffInMs = dueDateInMs - Date.now();
                        // transformar ms em dias
                        const dayInMs = 1000 * 60 * 60 * 24;
                        const dayDiff = Math.floor(timeDiffInMs / dayInMs);
                        
                        // restam tantos dias...
                        return dayDiff;
                }
        }
};


routes.get("/", Job.controllers.index); 
routes.get("/job", Job.controllers.create); 
routes.get("/job/edit", (req, res) => res.render(views + "job-edit")); 
routes.get("/profile", (req, res) => res.render(views + "profile", { profile })); 

routes.post("/job", Job.controllers.save); 

module.exports = routes; 