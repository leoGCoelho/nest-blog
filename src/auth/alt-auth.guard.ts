import { AuthGuard } from "@nestjs/passport";

export class AltAuthGuard extends AuthGuard('jwt'){
    handleRequest(err, user, info, context){
        return user;
    }
}