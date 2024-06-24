function generateEmailTemplate(employeeName, companyName, newJobStatus, reason, yourName, yourJobTitle, yourContactInfo) {
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return `
Subject: Notification of Job Status Change

Dear ${employeeName},

I hope this message finds you well.

I am writing to inform you of a change in your job status with ${companyName}. Effective ${currentDate}, your job status will be updated to ${newJobStatus} due to ${reason}.

We appreciate your hard work and dedication to the company and are confident that you will continue to excel in your new role/status. Should you have any questions or need further clarification, please do not hesitate to contact me or the HR department.

Thank you for your understanding and cooperation.

Best regards,

${yourName}
${yourJobTitle}
${companyName}
${yourContactInfo}
    `;
}

// Example usage:

