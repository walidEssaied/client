import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
 AuthPage,
 ErrorComponent,
 Layout,
 RefineSnackbarProvider,
 Title,
 notificationProvider
} from "@refinedev/mui";

import { InboxOutlined, Outbound, People, PeopleOutline, ProductionQuantityLimitsTwoTone } from "@mui/icons-material";
import { CssBaseline, GlobalStyles } from "@mui/material";
import routerBindings, {
 CatchAllNavigate,
 NavigateToResource,
 UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { DataProvider } from "@refinedev/strapi-v4";
import { Sider } from "components/sider";
import {
 BlogPostCreate,
 BlogPostEdit,
 BlogPostList,
 BlogPostShow,
} from "pages/blog-posts";
import {
 CategoryCreate,
 CategoryEdit,
 CategoryList,
 CategoryShow,
} from "pages/categories";
import { ClientCreate, ClientEdit, ClientList, ClientShow } from "pages/clients";
import { FarmerCreate, FarmerEdit, FarmerList, FarmerShow } from "pages/farmers";
import { InStockCreate, InStockEdit, InStockList, InStockShow } from "pages/in-stock";
import { OutStockCreate, OutStockEdit, OutStockList, OutStockShow } from "pages/out-stcok";
import { ProduitCreate, ProduitEdit, ProduitList, ProduitShow } from "pages/produits";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider, axiosInstance } from "./authProvider";
import { Header } from "./components/header";
import { API_URL } from "./constants";
import { ColorModeContextProvider } from "./contexts/color-mode";


const queryClient = new QueryClient();




function App() {
 return (
  <BrowserRouter>
   {/* <GitHubBanner /> */}
   <QueryClientProvider client={queryClient}>
    <RefineKbarProvider>
     <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
       <Refine
        authProvider={authProvider}
        dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
        notificationProvider={notificationProvider}
        routerProvider={routerBindings}
        Sider={Sider}
        resources={[
         {
          name: "clients",
          list: "/clients",
          create: "/clients/create",
          edit: "/clients/edit/:id",
          show: "/clients/show/:id",
          meta: {
           icon: <PeopleOutline />,
           canDelete: true,
          },
         },
         {
          name: "farmers",
          list: "/farmers",
          create: "/farmers/create",
          edit: "/farmers/edit/:id",
          show: "/farmers/show/:id",
          meta: {
           icon: <People />,
           canDelete: true,
          },
         },
         {
          name: "produits",
          list: "/produits",
          create: "/produits/create",
          edit: "/produits/edit/:id",
          show: "/produits/show/:id",
          meta: {
           icon: <ProductionQuantityLimitsTwoTone />,
           canDelete: true,
          },
         },
         {
          name: "ins",
          list: "/ins",
          create: "/ins/create",
          edit: "/ins/edit/:id",
          show: "/ins/show/:id",
          meta: {
           label: "In Stock",
           icon: <InboxOutlined />,
           canDelete: true,
          },
         },
         {
          name: "outs",
          list: "/outs",
          create: "/outs/create",
          edit: "/outs/edit/:id",
          show: "/outs/show/:id",
          meta: {
           label: "Out Stock",
           icon: <Outbound />,
           canDelete: true,
          },
         },
        ]}
        options={{
         syncWithLocation: true,
         warnWhenUnsavedChanges: true,
        }}
       >
        <Routes>
         <Route
          element={
           <Authenticated fallback={<CatchAllNavigate to="/login" />}>
            <Layout Header={Header}
             Title={Title}
             Sider={Sider}
            >
             <Outlet />
            </Layout>
           </Authenticated>
          }
         >
          <Route
           index
           element={<NavigateToResource resource="clients" />}
          />
          <Route path="/blog-posts">
           <Route index element={<BlogPostList />} />
           <Route path="create" element={<BlogPostCreate />} />
           <Route path="edit/:id" element={<BlogPostEdit />} />
           <Route path="show/:id" element={<BlogPostShow />} />
          </Route>
          <Route path="/clients">
           <Route index element={<ClientList />} />
           <Route path="create" element={<ClientCreate />} />
           <Route path="edit/:id" element={<ClientEdit />} />
           <Route path="show/:id" element={<ClientShow />} />
          </Route>
          <Route path="/farmers">
           <Route index element={<FarmerList />} />
           <Route path="create" element={<FarmerCreate />} />
           <Route path="edit/:id" element={<FarmerEdit />} />
           <Route path="show/:id" element={<FarmerShow />} />
          </Route>
          <Route path="/produits">
           <Route index element={<ProduitList />} />
           <Route path="create" element={<ProduitCreate />} />
           <Route path="edit/:id" element={<ProduitEdit />} />
           <Route path="show/:id" element={<ProduitShow />} />
          </Route>
          <Route path="/ins">
           <Route index element={<InStockList />} />
           <Route path="create" element={<InStockCreate />} />
           <Route path="edit/:id" element={<InStockEdit />} />
           <Route path="show/:id" element={<InStockShow />} />
          </Route>
          <Route path="/outs">
           <Route index element={<OutStockList />} />
           <Route path="create" element={<OutStockCreate />} />
           <Route path="edit/:id" element={<OutStockEdit />} />
           <Route path="show/:id" element={<OutStockShow />} />
          </Route>
          <Route path="/categories">
           <Route index element={<CategoryList />} />
           <Route path="create" element={<CategoryCreate />} />
           <Route path="edit/:id" element={<CategoryEdit />} />
           <Route path="show/:id" element={<CategoryShow />} />
          </Route>
         </Route>
         <Route
          element={
           <Authenticated fallback={<Outlet />}>
            <NavigateToResource />
           </Authenticated>
          }
         >
          <Route
           path="/login"
           element={
            <AuthPage
             type="login"
             formProps={{
              defaultValues: {
               email: "demo@refine.dev",
               password: "demodemo",
              },
             }}
            />
           }
          />
         </Route>
         <Route
          element={
           <Authenticated>
            <Layout Header={Header}>
             <Outlet />
            </Layout>
           </Authenticated>
          }
         >
          <Route path="*" element={<ErrorComponent />} />
         </Route>
        </Routes>

        <RefineKbar />
        <UnsavedChangesNotifier />
       </Refine>
      </RefineSnackbarProvider>
     </ColorModeContextProvider>
    </RefineKbarProvider>
   </QueryClientProvider>
  </BrowserRouter>
 );
}

export default App;
