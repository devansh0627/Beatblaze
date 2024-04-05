import jwt from "jsonwebtoken";
async function getToken(email, user) {
    const token = jwt.sign({ identifier: user._id }, 'thisKeyIsSupposedToBeSecret');
    return token;
}
export { getToken };