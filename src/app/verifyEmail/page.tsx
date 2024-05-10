"use client";

import { baseURL } from "@/utils/config";
import axios from "axios";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const VerifyEmail = () => {
  const [token, setToken]: any = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const api = axios.create({
    baseURL,
  });

  async function verify() {
    try {
      const response = await api.post("/api/user/verifyEmail", {
        token,
      });

      if (response.data.success) {
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
    }
  }

  useEffect(() => {
    setToken(searchParams.get("token"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        style={{
          backgroundColor: "rgb(239, 239, 239)",
          height: "100vh",
          paddingTop: "80px",
        }}
      >
        <table
          role="presentation"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: 0,
            borderSpacing: 0,
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          <tbody>
            <tr>
              <td
                align="center"
                style={{
                  padding: "1rem 2rem",
                  verticalAlign: "top",
                  width: "100%",
                }}
              >
                <table
                  style={{
                    maxWidth: 600,
                    borderCollapse: "collapse",
                    border: 0,
                    borderSpacing: 0,
                    textAlign: "left",
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={{ padding: "40px 0 0" }}>
                        <div
                          style={{
                            padding: 20,
                            backgroundColor: "rgb(255, 255, 255)",
                          }}
                        >
                          <div
                            style={{ color: "rgb(0, 0, 0)", textAlign: "left" }}
                          >
                            <h1 style={{ margin: "1rem 0" }}>Final step...</h1>
                            <p style={{ paddingBottom: 16 }}>
                              Follow this link to verify your email address.
                            </p>
                            <p style={{ paddingBottom: 16 }}>
                              <a
                                style={{
                                  cursor: "pointer",
                                  padding: "12px 24px",
                                  borderRadius: 4,
                                  color: "#FFF",
                                  background: "#2B52F5",
                                  display: "inline-block",
                                  margin: "0.5rem 0",
                                }}
                                onClick={() => verify()}
                              >
                                Confirm now
                              </a>
                            </p>
                            <p style={{ paddingBottom: 16 }}>
                              If you didnt ask to verify this address, you can
                              ignore this email.
                            </p>
                            <p style={{ paddingBottom: 16 }}>
                              Thanks,
                              <br />
                              The Auth team
                            </p>
                          </div>
                        </div>
                        <div
                          style={{
                            paddingTop: 20,
                            color: "rgb(153, 153, 153)",
                            textAlign: "center",
                          }}
                        >
                          <p style={{ paddingBottom: 16 }}>
                            Made with ♥ by Sohail
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Suspense>
  );
};

const SuspenseWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <VerifyEmail />
  </Suspense>
);

export default SuspenseWrapper;
