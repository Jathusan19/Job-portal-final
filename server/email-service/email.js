import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "kajanandude@gmail.com",
        pass: "bzofaraxoljcplse"
    }

})


export  const sendEmail = async (to, subject, body) => {

    let mailOptions = {
        to,
        from: "kajanandude@gmail.com",
        subject,
        html: body
    }


    await new Promise((resolve, reject) => {

        transporter.sendMail(mailOptions, (err, res) => {

            if (err) {
                console.log(err);
                reject(err)
            }
            else {
                console.log(res);
                resolve(res)
            }

        })


    })

}
