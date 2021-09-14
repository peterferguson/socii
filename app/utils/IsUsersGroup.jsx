import { useAuth } from "@hooks/useAuth";
import { useRouter } from "next/router";

export const IsUsersGroup = () => {
  const { userGroups } = useAuth();
  const router = useRouter();
  const { groupName } = router.query;
  return userGroups && userGroups.includes(groupName) ? true : null;
};
