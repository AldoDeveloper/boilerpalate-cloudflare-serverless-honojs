import { basicAuth } from "hono/basic-auth";
import { HTTPException } from "hono/http-exception";
import bcrypt from "bcryptjs";
import { UserService } from "../modules/user/user.service";

export const authenticationBasic = basicAuth({
    async verifyUser(username, password, c) {

        const userServices = c.get('userService') as UserService;
        const user   = await userServices.findByUsername(username);

        if(!user) throw new HTTPException(401, { message: "Unauthorized"});

        if(!await bcrypt.compare(password, user.password))
            throw new HTTPException(401, { message: "Unauthorized"})

        return true;
    }
})