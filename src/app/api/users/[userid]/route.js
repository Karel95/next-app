import { NextResponse } from "next/server";


////////////////////////////////////
/*  Next.js Route Handlers Params */
////////////////////////////////////

// This is a simple API route that handles GET, POST, PUT, and DELETE requests for example purposes.
// You can replace the logic inside each function with your own implementation as needed, like fetching data from a database or performing other operations.

// The `params` object contains the dynamic segments of the URL, allowing you to access the `userid` parameter in this case.
// For example, if the URL is `/api/posts/123`, `params.userid` will be `123`.
// The `params` object is automatically populated by Next.js based on the dynamic segments in the URL. In this case, it will contain the `userid` parameter.
export async function GET(request, { params }) {
  // You can also access the request object to get query parameters, headers, etc.
  // For example, you can get the query parameters using request.url or request.query.
  // The searchParams property of the URL object allows you to access the query parameters in the URL.
  // For example, if the URL is `/api/posts/123?search=hello`, searchParams.get('search') will return 'hello'.
  // You can also use searchParams.has('paramName') to check if a specific query parameter exists.
  // The searchParams object is an instance of the URLSearchParams interface, which provides methods for working with query parameters.
  // For example, you can use searchParams.get('paramName') to get the value of a specific query parameter.
  // You can also use searchParams.set('paramName', 'value') to set the value of a specific query parameter.
  // You can also use searchParams.delete('paramName') to remove a specific query parameter from the URL.
  // You can also use searchParams.append('paramName', 'value') to add a new query parameter to the URL.
  // The searchParams object is automatically populated by Next.js based on the query parameters in the URL.
  // In this case, it will contain all the query parameters in the URL.
  // For example, if the URL is `/api/posts/123?search=hello&sort=asc`, searchParams will contain both `search` and `sort` parameters.
  // You can use searchParams.get('paramName') to get the value of a specific query parameter.
  // You can also use searchParams.has('paramName') to check if a specific query parameter exists.
  const { searchParams } = new URL(request.url);

  return NextResponse.json({ message: `Searching user ${params.userid} with search params: ${searchParams}` });
}

export async function POST(request){

  // The request object contains the body of the request, which can be accessed using the json() method.
  // The json() method returns a promise that resolves to the parsed JSON data from the request body.
  // You can use this data to create a new user or perform other operations as needed.
  // For example, you can use the data to create a new user in your database or perform other operations as needed.
  // The request object also contains other properties like headers, method, etc. that you can use to get more information about the request.
  // For example, you can use request.headers.get('Content-Type') to get the content type of the request.
  // You can also use request.method to get the HTTP method of the request (GET, POST, PUT, DELETE, etc.).
  // You can also use request.url to get the URL of the request.
  // The request object is automatically populated by Next.js based on the incoming request.
  // In this case, it will contain the body of the request, which can be accessed using the json() method.
  const data = await request.json();

  return NextResponse.json({ message: `Creating user with data: ${data}` });
}

export function PUT(){
  return NextResponse.json({ message: `Updating user` });
}

export function DELETE(){
  return NextResponse.json({ message: `Deleting user` });
}