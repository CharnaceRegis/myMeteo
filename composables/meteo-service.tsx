import sun from "@/assets/images/sun.png";
import cloud from "@/assets/images/cloud.png";
import rain from "@/assets/images/rain.png";
import snow from "@/assets/images/snow.png";
import thunder from "@/assets/images/thunder.png";

export const WEATHER_INTERPRATIONS = [
    {
        codes: [0],
        label: "Ensoleillé",
        image: sun,
    },
    {
        codes: [1, 2, 3, 45, 48],
        label: "Nuageux",
        image: cloud,
    },
    {
        codes: [
            51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 85, 86,
        ],
        label: "Pluvieux",
        image: rain,
    },
    {
        codes: [71, 73, 75, 77],
        label: "Neigeux",
        image: snow,
    },
    {
        codes: [96, 99],
        label: "Orageux",
        image: thunder,
    },
];

export function getWeatherInterpretation(code: number) {
    return WEATHER_INTERPRATIONS.find((interpretation) =>
        interpretation.codes.includes(code)
    );
}
