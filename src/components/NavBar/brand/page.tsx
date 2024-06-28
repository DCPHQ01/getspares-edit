import { Card } from "@mui/material";

const BrandPage = () => {

    const brandsCartegory = [
      {
        ListBrands: {
          header: "List of brands (Cars)",
          id: 1,
          toyota: "Toyota",
          honda: "Honda",
          camry: "Camry",
          nissan: "Nissan",
          mercedes: "Mercedes",
          peugeot: "Peugeot",
          hyundai: "Hyundai",
          kia: "KIA",
          lexus: "Lexus",
          volkswagen: "Volkswagen",
          bmw: "BMW",
          ford: "Ford",
          mazda: "Mazda",
          isuzu: "Isuzu",
          mitsubishi: "Mitsubishi",
          volvo: "Volvo",
          rover: "Rover",
          suzuki: "Suzuki",
        },

        ListHeavyDutyBrand: {
          header: "List of brands (Heavy Duty)",
          id: 2,
          john: "John Deere",
          sonalika: "Sonalika",
          farmTrack: "Farm Track",
          mahindra: "Mahindra",
          preet: "Preet",
          case: "CASE",
          tata: "Tata",
          caterpillar: "Caterpillar",
          mack: "Mack",
          iveco: "IVECO",
          komatsu: "Komatsu",
          daf: "DAF",
          volvo: "Volvo",
          changan: "Changan",
        },
      },
    ];
    return (
      <div>
        <Card
          className="w-full  "
          style={{
            boxShadow: "0px 2px 8px 0px #63636333",
            zIndex: 200,
          }}
        >
          {brandsCartegory.map((brands) => (
            <div
              key={brands.ListBrands.id}
              className="h-96 flex scrollbar-none justify-between p-6 leading-10 gap-x-32 overflow-y-scroll "
            >
              <div className="flex-col">
                <p>{brands.ListBrands.header}</p>
                <p>{brands.ListBrands.toyota}</p>
                <p>{brands.ListBrands.honda}</p>
                <p>{brands.ListBrands.camry}</p>
                <p>{brands.ListBrands.nissan}</p>
                <p>{brands.ListBrands.mercedes}</p>
                <p> {brands.ListBrands.peugeot}</p>
                <p> {brands.ListBrands.hyundai}</p>
                <p> {brands.ListBrands.kia}</p>
                <p>{brands.ListBrands.lexus}</p>
                <p>{brands.ListBrands.volkswagen}</p>
                <p>{brands.ListBrands.bmw}</p>
                <p>{brands.ListBrands.ford}</p>
                <p> {brands.ListBrands.mazda}</p>
                <p>{brands.ListBrands.isuzu}</p>
                <p>{brands.ListBrands.mitsubishi}</p>
                <p>{brands.ListBrands.volvo}</p>
                <p>{brands.ListBrands.rover}</p>
                <p>{brands.ListBrands.suzuki}</p>
              </div>
              <div key={brands.ListHeavyDutyBrand.id} className=""></div>
              <div className="flex-col">
                <p>{brands.ListHeavyDutyBrand.header}</p>
                <p>{brands.ListHeavyDutyBrand.case}</p>
                <p>{brands.ListHeavyDutyBrand.caterpillar}</p>
                <p>{brands.ListHeavyDutyBrand.changan}</p>
                <p>{brands.ListHeavyDutyBrand.daf}</p>
                <p>{brands.ListHeavyDutyBrand.farmTrack}</p>
                <p> {brands.ListHeavyDutyBrand.iveco}</p>
                <p> {brands.ListHeavyDutyBrand.john}</p>
                <p> {brands.ListHeavyDutyBrand.komatsu}</p>
                <p>{brands.ListHeavyDutyBrand.mack}</p>
                <p>{brands.ListHeavyDutyBrand.mahindra}</p>
                <p>{brands.ListHeavyDutyBrand.preet}</p>
                <p>{brands.ListHeavyDutyBrand.sonalika}</p>
                <p> {brands.ListHeavyDutyBrand.tata}</p>
                <p>{brands.ListHeavyDutyBrand.volvo}</p>
              </div>
            </div>
          ))}
        </Card>
      </div>
    );
}

export default BrandPage
