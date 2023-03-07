import { useState } from "react";
import axios from "axios";

const PostOffer = () => {
    const [offerId, setOfferId] = useState("");
    const [offerTitle, setOfferTitle] = useState("");
    const [offerDescription, setOfferDescription] = useState("");
    const [offerSortOrder, setOfferSortOrder] = useState("");
    const [daysOfWeek, setDaysOfWeek] = useState("");
    const [datesOfMonth, setDatesOfMonth] = useState("");
    const [monthsOfYear, setMonthsOfYear] = useState("");
    const [itemId, setItemId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [offerImage, setOfferImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("offer_id", offerId);
        formData.append("offer_title", offerTitle);
        formData.append("offer_description", offerDescription);
        formData.append("offer_sort_order", offerSortOrder);
        formData.append("days_of_week", daysOfWeek);
        formData.append("dates_of_month", datesOfMonth);
        formData.append("months_of_year", monthsOfYear);
        formData.append("item_id", itemId);
        formData.append("quantity", quantity);
        formData.append("offer_image", offerImage);

        formData.forEach((val, key) => {
            console.log(key, val)
        })
        try {
            const res = await axios.post("http://localhost:3033/api/offers", {
                formData
            }, {
                headers: { authorization: `${localStorage.getItem("authToken")}` },
            });
            console.log(res.data);
            // reset form
            setOfferId("");
            setOfferTitle("");
            setOfferDescription("");
            setOfferSortOrder("");
            setDaysOfWeek("");
            setDatesOfMonth("");
            setMonthsOfYear("");
            setItemId("");
            setQuantity("");
            setOfferImage(null);
        } catch (err) {
            console.log(err);
        }
    };

    const handleImageChange = (e) => {
        // console.log(e.target.files[0])
        if (e.target.files[0]) {
            setOfferImage(e.target.files[0].name);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Offer ID:
                    <input
                        type="text"
                        value={offerId}
                        onChange={(e) => setOfferId(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Offer Title:
                    <input
                        type="text"
                        value={offerTitle}
                        onChange={(e) => setOfferTitle(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Offer Description:
                    <textarea
                        value={offerDescription}
                        onChange={(e) => setOfferDescription(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Offer Sort Order:
                    <input
                        type="number"
                        value={offerSortOrder}
                        onChange={(e) => setOfferSortOrder(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Days of Week:
                    <input
                        type="text"
                        value={daysOfWeek}
                        onChange={(e) => setDaysOfWeek(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Dates of Month:
                    <input
                        type="text"
                        value={datesOfMonth}
                        onChange={(e) => setDatesOfMonth(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Months of Year:
                    <input
                        type="text"
                        value={monthsOfYear}
                        onChange={(e) => setMonthsOfYear(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Item ID:
                    <input
                        type="text"
                        value={itemId}
                        onChange={(e) => setItemId(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Quantity:
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Offer Image:
                    <input
                        type="file"
                        onChange={handleImageChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    );
};


export default PostOffer;