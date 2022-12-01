
const mongoose=require("mongoose")
const url = "mongodb://127.0.0.1:27017/Human_Resource";
const Schema=mongoose.Schema;
const data=require("./data.json")


const EmpSchema=new Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        salary: {
            type: Number,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        lastCompany: String,
        lastSalary: Number,
        overallExp: Number,
        contactInfo: Number,
        yearGrad: Number,
        gradStream: String
    })

async function main(){
    await mongoose.connect(url)
    const EmpModel=mongoose.model("employee",EmpSchema);
    const response1 = await EmpModel.insertMany(data);
    console.log('data is inserted successfully',response1)


    const salary=await EmpModel.find({salary:{$gt:30000}})
    console.log(salary,"salary greater than 30000 data fetched successfully...");

    const exp=await EmpModel.find({overallExp:{$gte:2}})
    console.log(exp,"exp more than 2 yrs data available");

    const GradExp=await EmpModel.find({yearGrad:{$gt:2015},overallExp:{$gte:2}})
    console.log(GradExp,"year of graduation 2015 and having exp more than two years");

    const setsalary=await EmpModel.updateMany({salary:{$gt:70000}},{$set:{salary:65000}})
    console.log(setsalary,"salary is updated");

    const deleteY=await EmpModel.deleteMany({lastCompany:"Y"})
    console.log(deleteY,"DATA deleted");


}



main()