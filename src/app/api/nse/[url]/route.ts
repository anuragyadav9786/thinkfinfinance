import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ url: string }> }
) {
  const { url } = await params;

  let targetUrl = "";

  switch (url) {
    case "allIndices":
      targetUrl = "https://www.nseindia.com/api/allIndices";
      break;

    case "getMarqueData":
      targetUrl =
        "https://www.nseindia.com/api/NextApi/apiClient?functionName=getMarqueData";
      break;

    default:
      return NextResponse.json(
        { error: "Invalid NSE endpoint" },
        { status: 400 }
      );
  }

  try {
    const res = await fetch(targetUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch NSE data" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
