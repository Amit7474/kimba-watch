function KimbaSettings(props) {
	return (
		<Page>
			<Section
				title={
					<Text bold align="center">
						Kimba Settings
					</Text>
				}
			>
				<TextInput
					label="Veporizer IP Address"
					placeholder="192.168.2.1"
                    settingsKey="ipAddr"
                    action="Save IP"
				/>
			</Section>
		</Page>
	);
}

registerSettingsPage(KimbaSettings);
