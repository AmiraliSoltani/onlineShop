import React from "react";
import "./../../../css/specifications.css";
import Table from "react-bootstrap/Table";

function Specifications({ product }) {
  // Ensure product specifications exist
  const specifications = product?.specifications || [];
console.log("specifications",specifications)
  return (
    <div className="main__content">
      <Table striped bordered hover>
        <thead>
          {/* <tr>
            <th colSpan="2">Product Specifications</th>
          </tr> */}
        </thead>
        <tbody>
        {specifications.map((spec, index) => {
  const [key, value] = Object.entries(spec)[0]; // Extract the first key-value pair from each object
  return (
    <tr key={index}>
      <td className="title">{key}</td>
      <td>{value}</td>
    </tr>
  );
})}

        </tbody>
      </Table>
    </div>
  );
}

export default Specifications;


// import React from "react";
// import "./../../../css/specifications.css";
// import Table from "react-bootstrap/Table";
// import { getAttributes } from "../../common/functionsOfProducts";

// function Specifications({ product, allAttribute }) {


//   const productAttribute = [];
//   if (product !== undefined) {
//     productAttribute.push(["جنس", getAttributes(product, allAttribute, 3)[0]]);
//     productAttribute.push(["تن خور", getAttributes(product, allAttribute, 7)[0]]);
//     productAttribute.push(["نوع آستین", getAttributes(product, allAttribute, 8)[0]]);
//     productAttribute.push(["مناسب برای فصل", getAttributes(product, allAttribute, 6)[0]]);
//     productAttribute.push(["گروه سنی", getAttributes(product, allAttribute, 5)[0]]);
//   }

//   return (
//     <div className="main__content">
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th colSpan="2">مشخصات فیزیکی</th>
//           </tr>
//         </thead>
//         <tbody>
//           {productAttribute.map((a, index) => {
//             if (a[1] !== undefined) {
//               return (
//                 <tr key={index}>
//                   <td className="title">{a[0]}</td>
//                   <td>{a[1].title}</td>
//                 </tr>
//               );
//             }
//           })}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// export default Specifications;
