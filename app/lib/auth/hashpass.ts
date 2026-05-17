import bcrypt from "bcrypt";
export default async function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
