import "./App.css";
import { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

function App() {
	const api_key = "28410a902b7243d487e134923212407";
	const [data, setData] = useState([]);

	const [city, setCity] = useState("dhaka");

	useEffect(() => {
		const getData = async (data) => {
			const response = await axios.get(
				`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=1&aqi=no&alerts=no`
			);
			setData(Object.values(response));
		};
		getData();
	}, [city]);

	if (city === "") {
		setCity("dhaka");
	}

	const submit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="app">
			{data.length && (
				<div
					className={
						data[0].current.condition.code >
							1171 &&
						data[0].current.condition.code <
							1201
							? "app__nrml"
							: data[0].current
									.temp_c >
							  20
							? "app__bg"
							: "app__cold"
					}
				>
					<div className="app__search">
						<form
							type="submit"
							onSubmit={submit}
						>
							<input
								onChange={(e) =>
									setCity(
										e
											.target
											.value
									)
								}
								type="text"
							/>
						</form>
					</div>

					{data.length ? (
						<div className="app__weatherInfo">
							<img
								src={
									data[0]
										.current
										.condition
										.icon
								}
								alt=""
							/>
							<p>
								{
									data[0]
										.current
										.condition
										.text
								}
							</p>
							<h1>
								{
									data[0]
										.current
										.temp_c
								}
								&#176;
							</h1>
							<p>
								{
									data[0]
										.location
										.country
								}
							</p>
							<p>
								{
									data[0]
										.location
										.name
								}
							</p>
							<div className="app__weatherair">
								{data[0].current
									.humidity && (
									<p>
										<i className="fas fa-humidity"></i>{" "}
										{
											data[0]
												.current
												.humidity
										}

										%
									</p>
								)}
								{data[0].current
									.wind_kph && (
									<p>
										<i className="fal fa-wind"></i>{" "}
										{
											data[0]
												.current
												.wind_kph
										}
										km/h
									</p>
								)}
							</div>
						</div>
					) : (
						""
					)}
					<div className="app__forecast">
						{data[0].forecast.forecastday[0].hour.map(
							(forecast, ind) => (
								<div
									key={
										ind
									}
									className="app__forecastDetails"
								>
									<p>
										{
											forecast.time
										}
									</p>
									<img
										src={
											forecast
												.condition
												.icon
										}
										alt=""
									/>
									<h3>
										{
											forecast.temp_c
										}
										&#176;
									</h3>
								</div>
							)
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
