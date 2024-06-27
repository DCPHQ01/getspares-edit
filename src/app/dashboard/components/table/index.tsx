import React,{useState} from "react";
import MecaAdminOverview from "./mecaadmin/overview";
import VendorAdminOverview from "./vendoradmin/overview";
import { useAppSelector } from "../../../../redux/hooks";
import * as JWT from "jwt-decode";
import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";
import { roles } from "../utils/utils";
import { useUserRole } from "../../../hooks/useUserRole";

interface JwtPayload {
  resource_access: {
    meca: {
      roles: string[];
    };
  };
}

interface VendorOverview {
  dateJoined: string;
  imageUrl?: string ; 
  transactionValue:number;
  totalItemSold: number;
  itemName: string;
  
}


const [topPerformingProduct, setTopPerformingProduct] = useState<VendorOverview[]>([])

function Index() {
  const userRole = useUserRole();
  const role: any = userRole;

  switch (role) {
    case roles.MECA_ADMIN:
      return <MecaAdminOverview data={[]} />;
    case roles.VENDOR_ADMIN:
      return <VendorAdminOverview topPerformingProduct={topPerformingProduct} isLoading={false}/>;
    default:
      return null;
  }
}

export default Index;
