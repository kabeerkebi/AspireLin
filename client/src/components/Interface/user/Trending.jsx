import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import { AxiosClient } from "../../../config/api";
import { useNavigate } from "react-router-dom";

const Trending = () => {
  const navigate = useNavigate();
  const [backenddata, setbackendata] = useState([]);
  useEffect(() => {
    const fecthdata = async () => {
      await AxiosClient.get(`/postjob/getdata`)
        .then((result) => {
          const datas = result.data[0].postjobdata;
          setbackendata(datas);
        })
        .catch((er) => {
          console.log(er);
        });
    };
    fecthdata();
  }, []);

  const Tologin = (id, index) => {
    navigate(`user/applyjob/${index}/${id}`);
  };
  return (
    <>
      {backenddata &&
        backenddata.map(
          (items, index) =>
            index <= 5 && (
              <div
                className="col-lg-5 col-xl-4  col-md-6 col-sm-12  "
                key={index}
              >
                <Card className="max-w-[350px] bg-white">
                  <CardHeader className="justify-between">
                    <div className="flex gap-5">
                      {/* <Avatar isBordered radius="full" size="200px"src="http://localhost:5555/1714535520834_logo-Meta-768x432.png"  /> */}
                      <img
                        src={items.datas.Theimages}
                        width={45}
                        height={45}
                        alt=""
                      />
                      <div className="flex flex-col gap-1 items-start justify-center">
                        {/* <h4 className="text-small font-semibold leading-none text-default-600">
              Zoey Lang
            </h4> */}
                        <h5 className="text-small tracking-tight text-default-400 ">
                          {items.datas.CompanyName}
                        </h5>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="px-3 py-0 text-small text-default-400">
                    <p>
                      Frontend developer and UI/UX enthusiast. Join me on this
                      coding adventure!
                    </p>
                    <span className="pt-2">
                      #Trending
                      <span className="py-2" aria-label="computer" role="img">
                        💻
                      </span>
                    </span>
                  </CardBody>
                  <CardFooter className="gap-3">
                    <div className="flex gap-1">
                      <p className="font-semibold text-default-400 text-small">
                        18k
                      </p>
                      <p className=" text-default-400 text-small">Applied</p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        style={{ borderRadius: "8px" }}
                        className="text-white"
                        color="primary"
                        radius="full"
                        size="sm"
                        variant={"solid"}
                        onClick={() => Tologin(items.datas.TheobjID, index)}
                      >
                        Apply
                      </Button>
                      {/* <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p> */}
                    </div>
                  </CardFooter>
                </Card>
              </div>
            )
        )}
    </>
  );
};

export default Trending;
