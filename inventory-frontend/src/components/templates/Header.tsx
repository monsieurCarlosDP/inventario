import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { IconButton, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useAuth } from "../../context/auth/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  const avatarImage = user?.Avatar;

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
      <Stack
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
      >
        <>
          {avatarImage ? (
            <Avatar src={avatarImage} />
          ) : (
            <Avatar src={undefined} />
          )}
          <Typography variant="body1">{user?.username}</Typography>
        </>
      </Stack>
      <IconButton onClick={logout}>
        <PowerSettingsNewIcon />
      </IconButton>
    </Stack>
  );
};

export default Header;
