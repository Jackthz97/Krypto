import React, { useState, useEffect } from "react";
import axios from "axios";
import TrendingCryptoList from "./TrendingCryptoList";
import MarketCryptoList from "./MarketCryptoList";
import topFourTrending from "../../helpers/topFourTrending";
import SearchForm from "./SearchForm";
import searchFilter from "../../helpers/searchFilter";
import SideBarList from "./SideBarList";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button } from "@mui/material";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import Skeleton from "@mui/material/Skeleton";
import "./TrendingCrypto.scss";

const Dashboard = (props) => {
  const [state, setState] = useState([
    {
      trending: [],
      market: [],
    },
  ]);
  const [render, setRender] = useState("");
  const [dashboard, setDashboard] = useState("market");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handlewatchlist = () => {
    if (dashboard === "market") {
      setDashboard("watchlist");
    } else if (dashboard === "watchlist") {
      setDashboard("market");
    }
  };
  useEffect(() => {
    axios
      .get("/market")
      .then((res) => {
        setState((prev) => [
          { ...prev, market: res.data, trending: topFourTrending(res.data) },
        ]);
        setTimeout(() => {
          setLoading(true);
        }, 1000);
      })
      .catch((err) => console.log(err));
  }, [dashboard, render]);

  const inputHandler = (event) => {
    setSearch(event.target.value);
  };
  const filteredRows = searchFilter(state[0].market, search);

  const containerRef = React.useRef(null);
  return (
    <Box sx={{ mt: -4 }} ref={containerRef}>
      <Grid container justifyContent={"center"}>
        {loading ? (
          <div>
            <SideBarList mode={props.mode} setMode={props.setMode} />
            <Typography fontSize={25} fontFamily={"Pacifico"} mt={3} mb={3}>
              Dashboard
            </Typography>
            <Typography align="center" fontSize={20} fontFamily={"Pacifico"}>
              Trending
            </Typography>
            <TrendingCryptoList
              mode={props.mode}
              loading={loading}
              data={state[0].trending}
            />
            <Grid pt={4}>
              <SearchForm
                search={search}
                onChange={inputHandler}
                mode={props.mode}
                setMode={props.setMode}
              />
            </Grid>
            <Grid>
              {dashboard === "market" ? (
                <Grid
                  container
                  display={"flex"}
                  direction={"row"}
                  justifyContent={"space-between"}
                >
                  <Typography fontSize={20} fontFamily={"Pacifico"}>
                    Market
                  </Typography>
                  <FavoriteBorderIcon style={{cursor: 'pointer'}} onClick={handlewatchlist} />
                </Grid>
              ) : (
                <Grid
                  container
                  display={"flex"}
                  justifyContent={"space-between"}
                  direction={"row"}
                  gap={120}
                >
                  <Typography fontSize={20} fontFamily={"Pacifico"}>
                    Watch List
                  </Typography>
                  <CurrencyBitcoinIcon style={{cursor: 'pointer'}} onClick={handlewatchlist} />
                </Grid>
              )}
            </Grid>
            <MarketCryptoList
              loading={loading}
              render={render}
              setRender={setRender}
              dashboard={dashboard}
              data={filteredRows}
              mode={props.mode}
              setMode={props.setMode}
            />
          </div>
        ) : (
          <div>
            <SideBarList mode={props.mode} setMode={props.setMode} />
            <Typography fontSize={25} fontFamily={"Pacifico"} mt={3} mb={3}>
              Dashboard
            </Typography>
            <Typography align="center" fontSize={20} fontFamily={"Pacifico"}>
              Trending
            </Typography>

            <Skeleton
              variant="rectangular"
              animation="wave"
              width={1125}
              height={140}
            />
            <Grid pt={4} align="center">
              <SearchForm
                search={search}
                onChange={inputHandler}
                mode={props.mode}
                setMode={props.setMode}
              />
            </Grid>
            <Grid>
              {dashboard === "market" ? (
                <Grid
                  container
                  display={"flex"}
                  direction={"row"}
                  justifyContent={"space-between"}
                >
                  <Typography fontSize={20} fontFamily={"Pacifico"}>
                    Market
                  </Typography>
                  <Button onClick={handlewatchlist}>
                    <FavoriteBorderIcon/>
                  </Button>
                </Grid>
              ) : (
                <Grid
                  container
                  display={"flex"}
                  justifyContent={"space-between"}
                  direction={"row"}
                  gap={120}
                >
                  <Typography fontSize={20} fontFamily={"Pacifico"}>
                    Watch List
                  </Typography>
                  <Button onClick={handlewatchlist}>
                    <CurrencyBitcoinIcon />
                  </Button>
                </Grid>
              )}
            </Grid>
            <Skeleton variant="rectangular" animation="wave" height={"48vh"} />
          </div>
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard;
