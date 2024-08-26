import React, { useCallback, useEffect, useState } from "react";
import ButtonWithIcon from "./buttonWithIcon";
import "../../../styles/components/reusableComponents/dashboardNavBar.css";
import WebSocketService from "../notification/websocket";

type NotificationData = {
	message: string;
};
const DashboardNavBar = () => {
	const [currentDate, setCurrentDate] = useState("");
	const [currentTime, setCurrentTime] = useState("");
	const [notificationData, setNotificationData] = useState<NotificationData>();

	const fetchTime = useCallback(() => {
		const intervalId = setInterval(() => {
			const time = new Date().toLocaleTimeString();
			const date = new Date().toDateString();
			setCurrentTime(time);
			setCurrentDate(date);
		}, 1000);
		return () => clearInterval(intervalId);
	}, []);

	useEffect(fetchTime, [fetchTime]);

	function triggerNotificationBar() {
		const wsService = new WebSocketService({
			content: "string",
			senderId: "123456789",
			receiverId: "2349500",
			connectionUrl: "flywell-ws-connection",
		});

		wsService.subscribeToTopic("notification/booked-flight", (data) => {
			setNotificationData(data);
		});
	}

	return (
		<div className="Dashboard-NavBar-Main-Frame">
			{/* <div className="Search-Anything">
				<input type="text" name="" id="" placeholder="Search..." />
				<ButtonWithIcon
					iconWidth={"30px"}
					iconHeight={"30px"}
					icon={"ic:round-search"}
					buttonPlaceHolder={""}
				/>
			</div> */}
			<p>{notificationData?.message}</p>
			<div className={"Time-And-Date-Frame"}>
				<p>{currentTime}, </p>
				<p>{currentDate}</p>
			</div>
			<div className="Dashboard-NavBar-Icons-Frame">
				<ButtonWithIcon
					icon={"iconamoon:notification"}
					iconHeight={"40px"}
					iconWidth={"40px"}
					buttonPlaceHolder={""}
					iconColor="black"
					onClick={() => triggerNotificationBar()}
				/>
				<ButtonWithIcon
					icon={"iconamoon:email"}
					iconHeight={"40px"}
					iconWidth={"40px"}
					buttonPlaceHolder={""}
					iconColor="black"
				/>
				<ButtonWithIcon
					icon={"gg:profile"}
					iconHeight={"40px"}
					iconWidth={"40px"}
					buttonPlaceHolder={""}
					iconColor="black"
				/>
			</div>
		</div>
	);
};

export default DashboardNavBar;
