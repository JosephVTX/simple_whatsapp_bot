export const  getCommand = (totalCommand:string): {command, parameter} => {

    totalCommand = totalCommand.trim()
    const command = totalCommand.split(" ")[0]
    const parameter = totalCommand.replace(command, "").trim()

    return {

        command,
        parameter
    }

}

