import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addData } from "../store/Reducer";
import { useEffect } from "react";

const Item = styled(Paper)(({ theme }) => ({
  margin: "40px",
  padding: theme.spacing(6),
  textAlign: "center",
}));

interface OverallReportProps {
  formatMoney: (money: number) => string;
}

export default function OverallReport({ formatMoney }: OverallReportProps) {
  const dispatch = useDispatch();
  const { data } = useSelector((state:any) => state.data) 
  // console.log(data)
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://covid19.traffy.in.th/api/state-covid19"
      );
  
      dispatch(addData(res.data.results));
    };

    fetchData();
  }, []);

  const lastData = data.length > 0 ? data.slice(-1)[0]: <p>Loading</p>;

  // console.log(lastData);
  return (
    <div className="overallReport">
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection:"column",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Typography variant="h4">
          รายงานข้อมูล Covid-19 ของวันที่ {lastData.publishdate}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Item style={{ backgroundColor: "rgba(255, 186, 186, 1)" }}>
              <Typography variant="h6" color="#fff">
                จำนวนผู้ติดเชื้อรวม
              </Typography>
              <Typography variant="h4" color="#fff">
                {formatMoney(lastData.totalCases)}
              </Typography>
            </Item>
          </Grid>

          <Grid item xs={6} md={3}>
            <Item style={{ backgroundColor: "rgba(102, 123, 104, 1)" }}>
              <Typography variant="h6" color="#fff">
                หายแล้ว
              </Typography>
              <Typography variant="h4" color="#fff">
                {formatMoney(lastData.totalRecovered)}
              </Typography>
            </Item>
          </Grid>

          <Grid item xs={6} md={3}>
            <Item style={{ backgroundColor: "rgba(163, 184, 153, 1)" }}>
              <Typography variant="h6" color="#fff">
                กำลังรักษาตัว
              </Typography>
              <Typography variant="h4" color="#fff">
                {formatMoney(lastData.currentlyInfectedPatients)}
              </Typography>
            </Item>
          </Grid>

          <Grid item xs={6} md={3}>
            <Item style={{ backgroundColor: "rgba(192, 197, 206, 1)" }}>
              <Typography variant="h6" color="#fff">
                เสียชีวิต
              </Typography>
              <Typography variant="h4" color="#fff">
                {formatMoney(lastData.totalDeaths)}
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
