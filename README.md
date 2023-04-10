# !DiscussIt

### The application where you can make a post for discussing

## Technologies

-   -   Next.js 13

-   -   TypeScript

-   styling

-   -   [Tailwind CSS](https://tailwindcss.com/)

-   database services

-   -   [railway](https://railway.app) - for added database
-   -   [prisma](https://www.prisma.io/) - Relational databases. For communicate of any types of databases use only one syntax

-   auth system

-   -   [NextAuth.js](https://next-auth.js.org)

-   send data

-   -   [react-query](https://tanstack.com/query/latest)
-   -   axios

-   notification

-   -   [react-hot-toast](https://react-hot-toast.com)

-   linting

-   -   eslint
-   -   prettier
-   -   prettier-plugin-tailwindcss

## Steps

1. Created the project

used command:

```bash
npx create-next-app@latest
```

2. Installed Tailwind CSS

used command:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

in tailwind.config.js file added:

```javaScript
content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
```

in flobal.css file added:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Created Prisma schema

<!-- https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres -->

added the Prisma CLI as a development dependency

```bash
npm install prisma typescript ts-node @types/node --save-dev
```

created your Prisma schema file

```bash
npx prisma init
```

4. Take DATABASE URL

created a new project on Railway with Provision PostgreSQL

took DATABASE_URL in Connect folder

5. Created the database schema

<!-- https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgres -->

took Post model

```
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
}
```

6. Installed Prisma Client

<!-- https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/install-prisma-client-typescript-postgres -->

used command:

```bash
npm install @prisma/client
```

7. Made instantiate Client

created `client.js` file in prisma folder

```javaScript
import { PrismaClient } from "@prisma/client";

declare global {
	namespace NodeJS {
		interface Global {}
	}
}

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends NodeJS.Global {
	prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
```

8. Turn database schema into Prisma schema

run Prisma DB pull

to push prisma schema to the DB use:

```bash
npx prisma migrate dev
```

it's create a new model based on your prisma schema and sync the database with schema.

10. Generated the Prisma Client (if did't do step #7 or better do before step #7)
    used command:

```bash
npx prisma generate
```

---

11. Installed Auth.js for auth system

12. Installed prisma-adapter
<!-- https://authjs.dev/reference/adapter/prisma -->

```bash
npm install next-auth @prisma/client @next-auth/prisma-adapter

```

13. Created Google cloud project and credentials
<!-- https://console.cloud.google.com -->

take GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET

14. Created `.env.local` file and create GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET based on information from Google Cloud

15. Added to the Prisma schema
<!-- https://authjs.dev/reference/adapter/prisma -->

```
model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?  @db.Text
  access_token       String?  @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?  @db.Text
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

16. Added relation between the Post and User models

added next to the Post model to the `schema.prisma` file

```
userId    String
user      User     @relation(fields: [userId], references: [id])
```

17. Created the Prisma schema with prisma migrate

for create an SQL migration file and execute it:

```bash
npx prisma migrate dev
```

18. For fetching data from client component used react-query

used command

```bash
npm i @tanstack/react-query
```

19. for wrap the app with Query client provider created a QueryWrapper file

QueryWrapper file return:

```javaScript
return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
```

20. Wrapped all app in layout component with QueryWrapper component

```javaScript
<QueryWrapper>
	<Nav />
	{children}
</QueryWrapper>
```

21. Added useQueryClient and useMutation hooks to the AddPost component for mutation data

```javaScript
	// Access the client
	const queryClient = useQueryClient();

	// Mutations
	const mutation = useMutation({
		mutationFn: postTodo,
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
	});
```

22. Installed axios

```bash
npm i axios
```

23. For creating a post use useMutation hook

```javaScript
	const { mutate } = useMutation(
		async (title) => await axios.post("/api/post/addPost", { title })
	);
```

24. Added rote.ts file to the api/posts/addPost

25. For notification use react-hot-toast

use command:

```bash
npm i react-hot-toast
```

26. Added Toaster component above the app

for that added Toaster component to the QueryWrapper file
and in the AddPost component added `toast.error()` and `toast.success()`

27. For displaying that is making a post used `toast.loading()`

to update used:

```javaScript
	const toastId = toast.loading('Loading...');

	// ...

	toast.success('This worked', {
	id: toastId,
	});
```

or as an alternative can be use `toast.dismiss()`

```javaScript
	const toastId = toast.loading('Loading...');

	// ...

	toast.dismiss(toastId);
```

28. Fetching all Posts

created new api file (api/posts/getPosts/route.ts) for getting post

created a new component - Post.tsx that display a post

in page.tsx use `useQuery()` hook from react-query for get all posts and `map` that posts

29. For update rendered posts after add new post need to add `invalidateQueries` to `onSuccess()` function in AddPost.tsx component

```JavaScript
const queryClient = useQueryClient();
...
queryClient.invalidateQueries(["posts"]);
```

30. To have opportunity to add comments need to update Post model im prisma

```
model Comment {
	id        String      @id @default(cuid())
	message   String
	postId    String
	userId    String
	createdAt DateTime    @default(now())
	post      Post        @relation(fields: [postId], references: [id], onDelete: Cascade)
	user      User        @relation(fields: [userId], references: [id])
}
```

in User and Post models added for relation between Comment/Post and Comment/User

```
comment   Comment[]
```

`onDelete: Cascade` tells that if we want to delete Post we can delete all relative comments

to pushed prisma schema to the DB use:

```bash
npx prisma migrate dev
```

```bash
npx prisma generate
```

31. For get comments with Posts added in getPost api

```JavaScript
	include: {
		user: true,
		comment: true,
	},
```

32. Created `dashboard` page

imported `getServerSession` and `authOptions` for check if user is signed in.

if user is not sign ig he will be redirect to sign in page

Redirecting produce by `redirect` from next/navigation"

```JavaScript
	redirect("/api/auth/signin");
```

33. Created authPosts api

API creating for Get all the user's post and display they in the dashboard

34. Created `MyPosts` component that fetching user's post from api - `/api/posts/authPosts` to dashboard

35. Created `EditPost` component tha displayed single user's post with delete feature

36. Created `Toggle` component for delete the user's posts in the dashboard

37. In `EditPost` component used `useMutation` hook for call api (`/api/posts/deletePost`) that delete post and update a list of posts

deletePost and setDeleteToggle functions past to the `Toggle` component for using

38. Created `deletePost` api that do `prisma.post.delete`

39. Added `toast` in EditPost component for notification about deleting post and errors

40. Created `post/[slug]` component that take as param id of post, get data from api and display details about the post

41. Created `AddComment` component

42. Added `useQueryClient` and `useMutation` hooks to the AddComment component for the post comments

43. Created `/api/posts/addComment` endpoint for post comments

44. Created `Comment` component for display the comments

---

Challenges after this tutorial

1. Adding heart to comments or posts
2. Add delete to comments also
3. Adding Edit feature to Posts and Comments
4. show delete and edit button if you are a owner of the posts or comments

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
