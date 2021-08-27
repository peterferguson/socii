import { useAuth } from "@hooks/useAuth";
import { useRouter } from "next/router";

export const IsUsersGroup = ({ children }) => {
  const { userGroups } = useAuth();
  const router = useRouter();
  const { groupName } = router.query;
  return userGroups && userGroups.includes(groupName) ? children : null;
};
