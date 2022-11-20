import SimpleImageSlider from "react-simple-image-slider";
const images = [
    { url: "https://freemar.vn/blog/wp-content/uploads/2021/09/mobile-top-banner-moneysite-scaled.jpg" },
    { url: "https://tamquoc94.vn/kich-thuoc-banner-chuan/imager_3325.jpg" },
    { url: "https://cdn.tgdd.vn/Files/2021/05/16/1352049/trai-nghiem-san-khuyen-mai-tren-giao-dien-website-.png" },
    { url: "https://cdn.tgdd.vn/Files/2017/08/24/1015732/online-friday-760-367.png" },
    { url: "https://cdn.tgdd.vn/Files/2018/06/27/1097831/tung-bung-uu-dai-combo-dien-tu--dien-lanh-giam-tu-3--10-.png" },
    { url: "https://cdn.tgdd.vn/Files/2016/08/31/881752/quoc-khanh-2-9-760-3671.jpg" },
    { url: "https://cdn.tgdd.vn/Files/2018/12/28/1141041/sam-tet-ruoc-loc-mung-nam-moi-2019-vo-van-uu-dai-hap-dan-tai-dien-may-xanh-760x367.png" },
];
export default function SlideShow() {
    return (
        <div>
            <SimpleImageSlider
                width="81%"
                height={400}
                images={images}
                showBullets={true}
                showNavs={true}
                autoPlay={true}
                style={{ backgroundPosition: "center", backgroundSize: "cover" }}
            />
        </div>
    )
}