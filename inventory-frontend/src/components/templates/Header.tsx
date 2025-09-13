import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useAuth } from "../../context/auth/useAuth";
type Props = {};

const Header = (props: Props) => {
  const { user, logout } = useAuth();
  const avatarImage = user?.Avatar;
  console.log(avatarImage);
  return (
    <Stack
      component={"header"}
      sx={{
        height: "5vh",
        padding: 1,
        boxShadow: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {avatarImage && <Avatar src={avatarImage} />}
      <IconButton onClick={logout}>
        <PowerSettingsNewIcon />
      </IconButton>
    </Stack>
  );
};

export default Header;
