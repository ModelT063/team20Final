import { Grid, Typography, Box, Paper, Link} from "@mui/material";
import Navbar from "../components/Navbar";
import { UserInfo, UserType } from "@/types/user";
import { useRecoilValue } from "recoil";
import { userInfoState, userID } from "@/lib/userData";
import loadOrganizations from "@/utils/organizationService";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";

export default function Organizations() {
  const [data, setData] = useState<any>([]);

  const recoilType = useRecoilValue(userInfoState);
  const userType =
    recoilType.length === 0 ? -1 : parseInt(recoilType[0]["User_Type"]);

  useEffect(() => {
    loadOrganizations().then((result) => setData(result));
  }, []);

  return (
    <>
      <Navbar />
      <Box margin="8px">
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Typography margin="20px" variant="h5">Sponsor Organizations</Typography>
        </Box>
        <Box
          width="100%"
          justifyContent="center"
          display="flex"
          gap="2rem"
          color="0xFFFFFF"
          flexDirection="column"
          padding="8px"
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent="center"
            width="100%"
          >
            {data.map((org: any, index: number) => (
              <OrgTile
                key={index}
                name={org.Organization_Name}
                address={org.Address}
                ratio={org.Points_Ratio}
                type={userType}
              />
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

type OrgTileProps = {
  name: string;
  address: string;
  ratio: number;
  type: number;
};

const OrgTile = (props: OrgTileProps) => {
  const name = props.name;
  const address = props.address;
  const ratio = props.ratio;
  const type = props.type;

  return (
    <Paper
      sx={{
        padding: "8px",
        margin: "8px",
        maxWidth: "min-content",
        overflow: "hidden",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        maxWidth="fit-content"
        alignItems="center"
        textAlign="center"
      >
        <div>
          <Typography marginBottom="10px"variant="h5">{name}</Typography>
          <Typography marginBottom="10px">{address}</Typography>
          <Typography marginBottom="10px">Points Ratio: {ratio}</Typography>
          {type == UserType.driver && <Link component="button">Apply</Link>}
        </div>
      </Box>
      <a href='downloadS3'>GO TO APPLICATION</a>
    </Paper>
  );
};
