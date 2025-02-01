import { Component, createRef } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_blue.css";
import { FaCalendar } from "react-icons/fa6";

const options = {
  dateFormat: "Y-m-d",
  altInput: true,
  altFormat: "F j, Y",
  wrap: true,
  inline: true,
  enableTime: true,
  minDate: new Date(),
  maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
};

class DatePicker extends Component {
  state = {
    date: new Date(),
  };

  flatpickrRef = createRef<Flatpickr>();

  handleDateChange = (selectedDates: Date[]) => {
    this.setState({ date: selectedDates[0] });
  };

  componentWillUnmount() {
    if (this.flatpickrRef.current) {
      this.flatpickrRef.current.flatpickr.destroy();
    }
  }
  render() {
    const { date } = this.state;

    return (
      <div>
        <Flatpickr
          value={date}
          className="px-3 py-2 border rounded-md"
          onChange={this.handleDateChange}
          options={options}
          render={(_, ref) => (
            <div className="relative">
              <input
                ref={ref}
                defaultValue={date ? date.toISOString().split("T")[0] : ""}
                className="px-3 py-2 border rounded-md"
              />
              <FaCalendar className="absolute right-2 top-2 w-5 h-5 text-gray-500" />
            </div>
          )}
        />
        {date && <p>Selected Date: {date.toLocaleDateString("en-US")}</p>}
      </div>
    );
  }
}

export default DatePicker;
