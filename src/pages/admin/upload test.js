{/* <FormGroup row>
									<Label for="cert10" md={3}>
										10th Standard Certificate / Marks sheet
									</Label>
									<Col md={6}>
										<Input
											type="file"
											name="cert10"
											id="cert10"
											onChange={(e) =>
												this.setState({
													file0: e.target.files[0],
												})
											}
										/>
									</Col>
									<Col md={3}>
										<button
											className="btn btn-primary"
											type="submit"
											onClick={this.upload0}
										>
											{" "}
											Upload
										</button>
									</Col>
								</FormGroup>
upload0 = () => {
    // alert(this.state.file, this.state.file.name);
    const uploadTask = storage
        .ref(`${this.state.uid}/${this.state.file0.name}`)
        .put(this.state.file0);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            // progress function ...
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            // this.setState({ progress });
            console.log(progress);
        },
        (error) => {
            // Error function ...
            console.log(error);
        },
        () => {
            // complete function ...
            storage
                .ref(this.state.uid)
                .child(this.state.file0.name)
                .getDownloadURL()
                .then((url) => {
                    console.log("url", url);
                });
        }
    );
}; */}
