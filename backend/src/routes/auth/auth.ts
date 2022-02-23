import {Router} from "express";
import {UserDTO} from "../../dto/UserDTO";
import {useAuth} from "../../services/AuthService";
import {validate} from "class-validator";
import {respondWithBadValidation} from "../../helpers/api";

const router = Router();

router.get('/current', (req, res) => {
    const data = {
        test: "check"
    };
    res.json(data);
});

router.post('/register', async (req, res) => {
    const dto = new UserDTO();
    Object.assign(dto, req.body);

    const defaultErrorMsg = "Unable to register user";
    const errors = await validate(dto);
    if (errors.length > 0) {
        return respondWithBadValidation(res, defaultErrorMsg, errors);
    }

    const auth = useAuth();
    const user = await auth.createUser(dto.fullName, dto.email, dto.password);
    if (!user) {
        return respondWithBadValidation(res, defaultErrorMsg, auth.getErrors());
    }
    res.json({user});
})

export default router;
