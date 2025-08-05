"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InternationalOffline() {
  const [selectedMaxNamaLengkap, setselectedMaxNamaLengkap] = useState("");
  const maxNameChars = 180; // batasan maksimal karakter
  const [selectedMaxProject, setselectedMaxProject] = useState("");
  const [selectedNamaSekolah, setselectedNamaSekolah] = useState("");
  const maxSchoolChars = 500; // batasan maksimal karakter
  const maxProjectChars = 160; // batasan maksimal karakter
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryPrice, setCategoryPrice] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [canClick, setCanClick] = useState(false);
  const router = useRouter(); // React Router hook untuk navigasi

  const handleInputNameChange = (e) => {
    const { value } = e.target;
    if (value.length <= maxNameChars) {
      setselectedMaxNamaLengkap(value);
    }
  };

  const handleInputNameSchoolChange = (e) => {
    const { value } = e.target;
    if (value.length <= maxSchoolChars) {
      setselectedNamaSekolah(value);
    }
  };

  const handleInputProjectChange = (e) => {
    const { value } = e.target;
    if (value.length <= maxProjectChars) {
      setselectedMaxProject(value);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);

    // Logika untuk menentukan harga berdasarkan kategori yang dipilih
    switch (value) {
      case "World Youth Invention and Innovation Award - Offline Competition":
        break;
      case "World Youth Invention and Innovation Award - Offline Competition + Full Package":
        break;
      default:
        setCategoryPrice("");
        break;
    }
  };

  useEffect(() => {
    const termsAccepted = sessionStorage.getItem("termsAccepted");

    if (!termsAccepted) {
      alert("You must agree to the Terms & Conditions first.");
      router.push("/registration/homeinter"); // Navigasi ke halaman HomeIndo
    }
  }, [router]);

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyZ8h-bkDuKeURi3_Q0HWTdSq43EQTquvOZ3wKCS-Eq7lI1QlPtafOTHje9_Zzhn5qQ/exec";

  useEffect(() => {
    const form = document.forms["regist-form"];

    if (form) {
      const handleSubmit = async (e) => {
        e.preventDefault();
        setShowModal(true);
        setCanClick(false);
        setCountdown(5); // Set ulang countdown saat modal muncul

        let count = 5;
        const interval = setInterval(() => {
          count -= 1;
          setCountdown(count);

          if (count <= 1) {
            clearInterval(interval); // Hentikan countdown di angka 1
            setCanClick(true);
          }
        }, 1000);
      };

      form.addEventListener("submit", handleSubmit);
      return () => {
        form.removeEventListener("submit", handleSubmit);
      };
    }
  }, []);

  const handleConfirmSubmit = async () => {
    setShowModal(false); // Tutup modal
    const form = document.forms["regist-form"];

    if (!form) return;

    setIsLoading(true);
    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: new FormData(form),
      });

      if (response.ok) {
        setStatusMessage("Data sent successfully!");

        // Ambil data sebelum reset
        const formData = {
          namaLengkap: selectedMaxNamaLengkap,
          projectTitle: selectedMaxProject,
          category: selectedCategory,
          categoryPrice: categoryPrice,
          namasekolah: selectedNamaSekolah,
        };

        form.reset();
        setTimeout(() => {
          router.push(
            `/registration/thankyouinter?namaLengkap=${encodeURIComponent(
              selectedMaxNamaLengkap
            )}
            &projectTitle=${encodeURIComponent(selectedMaxProject)}
            &category=${encodeURIComponent(selectedCategory)}
            &namasekolah=${encodeURIComponent(selectedNamaSekolah)}`
          );
        }, 1000);
      } else {
        setStatusMessage("An error occurred while sending data.");
      }
    } catch (error) {
      setStatusMessage("An error occurred while sending data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="registration-section">
        <div className="container">
          <div className="content">
            <div className="sub">REGISTRATION FORM</div>
            <h1 className="garis-bawah"></h1>
            <br />
            <br />
            <h4>
              HELLO WYIIA 2025 PARTICIPANTS, Please consider the following
              information before filling out the registration form :
            </h4>
            <br />
            <p>
              1.&nbsp; &nbsp; Please fill in the required data correctly and
              ensure there are no writing errors. Also make sure that the data
              submitted is final and has not changed.
            </p>
            <p>
              2.&nbsp; &nbsp;After making sure the data is correct, you can
              click <span className="fw-bold">&quot;SUBMIT FORM&quot;</span>{" "}
              button once. If the data has been successfully submitted, you will
              be moved to another page.
            </p>
            <p>
              3.&nbsp; &nbsp;There will be an information email that the
              registration has been received sent to the team leader&apos;s
              email address, and the file will be validated by our team. Please
              be patient and wait for a maximum of 3 days after the registration
              time, the Letter of Acceptance (LOA) will be sent to the team
              leader&apos;s email address.
            </p>
            <br></br>
            <br></br>

            {showModal && (
              <div className="modal-overlay-submit">
                <div className="modal-submit text-lg-center text-md-center">
                  <h2 className="text-center">⚠️WARNING!</h2>
                  <p>
                    Submitted data cannot be changed. The committee will use the
                    latest submitted data for certificate printing.
                    <br />
                    <b>MAKE SURE ALL DATA IS CORRECT!</b>
                    <br />
                    <b>DO NOT RE-REGISTER WITH THE SAME DATA MULTIPLE TIMES!</b>
                  </p>

                  <div className="modal-buttons-submit">
                    <button onClick={() => setShowModal(false)}>Back</button>
                    <button
                      onClick={handleConfirmSubmit}
                      disabled={!canClick || isLoading}
                    >
                      {isLoading
                        ? "Submitting..."
                        : canClick
                        ? "Continue"
                        : `Please wait... ${countdown}`}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <form name="regist-form">
              <h1 className="text-sm md:text-lg lg:text-5xl">BIODATA</h1>
              <h1 className="garis-bawah"></h1>
              <div className="user-details">
                <div className="input-box">
                  <label for="CATEGORY_PARTICIPANT" className="form-label">
                    Categories Participant
                  </label>
                  <select
                    type="text"
                    id="CATEGORY_PARTICIPANT"
                    name="CATEGORY_PARTICIPANT"
                    className="form-control"
                    placeholder="Choose Categories Participant"
                    value=""
                    required
                  >
                    <option value="International Participant">
                      International Participant
                    </option>
                  </select>
                </div>
                <div className="input-box">
                  <label for="CATEGORY_COMPETITION" className="form-label">
                    Category Competition
                  </label>
                  <select
                    type="text"
                    id="CATEGORY_COMPETITION"
                    name="CATEGORY_COMPETITION"
                    className="form-control"
                    placeholder="Choose Category Competition "
                    required
                    onChange={handleCategoryChange}
                  >
                    <option value="">--Choose Category Competition--</option>
                    <option value="World Youth Invention and Innovation Award - Offline Competition">
                      Offline Competition
                    </option>
                    <option value="World Youth Invention and Innovation Award - Offline Competition + Full Package">
                      Offline Competition + Full Package
                    </option>
                  </select>
                </div>
              </div>

              <div className="user-details">
                <div className="input-box">
                  <label for="NAMA_LENGKAP" className="form-label">
                    Name of Leader & Member Team
                  </label>
                  <label>
                    <p>
                      Noted: Input the name of the team leader and team members
                      with the team leader&apos;s name at the beginning, with
                      the following format:
                    </p>
                    <p>Note: maximum 5 members + 1 team leader</p>
                    <h6>Kamal Putra</h6>
                    <h6>Ranu Ramadhan</h6>
                    <h6>Irsyad Zaidan</h6>
                  </label>
                  <textarea
                    type="text"
                    id="NAMA_LENGKAP"
                    name="NAMA_LENGKAP"
                    className="form-control"
                    placeholder="Input Name of Leader & Member Team"
                    required
                    value={selectedMaxNamaLengkap}
                    onChange={handleInputNameChange}
                  ></textarea>
                  <p>
                    {selectedMaxNamaLengkap.length} / {maxNameChars} character
                  </p>
                </div>
                <div className="input-box">
                  <label for="LEADER_WHATSAPP" className="form-label">
                    Leader WhatsApp Number
                    <p>
                      Please write with phone code, example : (phone code) (your
                      number) +62 8177091xxxx
                    </p>
                  </label>
                  <input
                    type="number"
                    id="LEADER_WHATSAPP"
                    name="LEADER_WHATSAPP"
                    className="form-control"
                    placeholder="Input Leader WhatsApp Number"
                    required
                  />
                </div>
                <div className="input-box">
                  <label for="PHONE_CODE" className="form-label">
                    Phone Code
                  </label>
                  <select
                    type="text"
                    id="PHONE_CODE"
                    name="PHONE_CODE"
                    className="form-control"
                    placeholder="Choose Phone Code "
                    required
                  >
                    <option value="">--Choose Phone Code--</option>
                    <option value="Afganistan +93">Afganistan +93</option>
                    <option value="Afrika Selatan +27">
                      Afrika Selatan +27
                    </option>
                    <option value="Afrika Tengah +236">
                      Afrika Tengah +236
                    </option>
                    <option value="Albania +355">Albania +355</option>
                    <option value="Algeria +213">Algeria +213</option>
                    <option value="Amerika Serikat +1">
                      Amerika Serikat +1
                    </option>
                    <option value="Arab Saudi +966">Arab Saudi +966</option>
                    <option value="Australia +61">Australia +61</option>
                    <option value="Azerbaijan +994">Azerbaijan +994</option>
                    <option value="Austria +43">Austria +43</option>
                    <option value="Bangladesh +880">Bangladesh +880</option>
                    <option value="Belanda +31">Belanda +31</option>
                    <option value="Belarus +375">Belarus +375</option>
                    <option value="Bolivia +591">Bolivia +591</option>
                    <option value="Brasil +55">Brasil +55</option>
                    <option value="Brunei Darussalam +673">
                      Brunei Darussalam +673
                    </option>
                    <option value="China +86">China +86</option>
                    <option value="Filipina +63">Filipina +63</option>
                    <option value="Finlandia +358">Finlandia +358</option>
                    <option value="Hongaria +36">Hongaria +36</option>
                    <option value="Hongkong +852">Hongkong +852</option>
                    <option value="India +91">India +91</option>
                    <option value="Irak +964">Irak +964</option>
                    <option value="Iran +98">Iran +98</option>
                    <option value="Irlandia +353">Irlandia +353</option>
                    <option value="Jepang +81">Jepang +81</option>
                    <option value="Kamboja +855">Kamboja +855</option>
                    <option value="Kazakhstan +7">Kazakhstan +7</option>
                    <option value="Korea Selatan +82">Korea Selatan +82</option>
                    <option value="Republik Kongo +243">
                      Republik Kongo +243
                    </option>
                    <option value="Kosta Rika +506">Kosta Rika +506</option>
                    <option value="Lebanon +961">Lebanon +961</option>
                    <option value="Malaysia +60">Malaysia +60</option>
                    <option value="Maroko +212">Maroko +212</option>
                    <option value="Mexico +52">Mexico +52</option>
                    <option value="Myanmar +95">Myanmar +95</option>
                    <option value="Nepal +977">Nepal +977</option>
                    <option value="Pakistan +92">Pakistan +92</option>
                    <option value="Rumania +40">Rumania +40</option>
                    <option value="Singapura +65">Singapura +65</option>
                    <option value="Slovenia +386">Slovenia +386</option>
                    <option value="Taiwan +886">Taiwan +886</option>
                    <option value="Thailand +66">Thailand +66</option>
                    <option value="Turki +90">Turki +90</option>
                    <option value="Turkmenistan +993">Turkmenistan +993</option>
                    <option value="Uni Emirat Arab +971">
                      Uni Emirat Arab +971
                    </option>
                    <option value="Uzbekistan +998">Uzbekistan +998</option>
                    <option value="Vietnam +84">Vietnam +84</option>
                    <option value="Zimbabwe +263">Zimbabwe +263</option>
                  </select>
                </div>
                <div className="input-box">
                  <label for="LEADER_EMAIL" className="form-label">
                    Leader Email Address
                  </label>
                  <label>
                    <p>
                      Notes: Please fill in the email correctly, LOA submissions
                      will be sent via the team leader&apos;s email address
                      filled in.
                    </p>
                  </label>
                  <input
                    type="email"
                    id="LEADER_EMAIL"
                    name="LEADER_EMAIL"
                    className="form-control"
                    placeholder="Input Your Leader Email Address"
                    required
                  />
                </div>
              </div>

              {/* DATA SEKOLAH START */}
              {/* DATA SEKOLAH START */}
              <h1 className="text-sm md:text-lg lg:text-5xl">SCHOOL DATA</h1>
              <h1 className="garis-bawah"></h1>
              <div className="user-details">
                <div className="input-box">
                  <label for="NAMA_SEKOLAH" className="form-label">
                    Name of School/University
                  </label>
                  <label>
                    <p>
                      Noted: if all members are in the same institution, write
                      only 1 institution.
                    </p>
                    <p>
                      If the members are not in the same institution, enter the
                      name of the school with the format in the order of the
                      name of the team leader and team members from each school,
                      with the following format:
                    </p>
                    <h6>SMA CERIA</h6>
                    <h6>HAPPY HIGH SCHOOL</h6>
                    <h6>SMA TADIKA MESRA</h6>
                  </label>
                  <textarea
                    type="text"
                    id="NAMA_SEKOLAH"
                    name="NAMA_SEKOLAH"
                    className="form-control"
                    placeholder="Input School Name of Leader & Member Team"
                    required
                    value={selectedNamaSekolah}
                    onChange={handleInputNameSchoolChange}
                  ></textarea>
                  <p>
                    {selectedNamaSekolah.length} / {maxSchoolChars} character
                  </p>
                </div>
              </div>
              <div className="user-details">
                <div className="input-box">
                  <label for="GRADE" className="form-label">
                    Grade{" "}
                  </label>
                  <select
                    type="text"
                    id="GRADE"
                    name="GRADE"
                    className="form-control"
                    placeholder="Choose Grade"
                    required
                  >
                    <option value="">--Choose Grade--</option>
                    <option value="Elementary">Elementary</option>
                    <option value="Secondary">Secondary</option>
                    <option value="University">University</option>
                  </select>
                </div>
                <div className="input-box">
                  <label for="COUNTRY" className="form-label">
                    Country
                  </label>
                  <input
                    type="text"
                    id="COUNTRY"
                    name="COUNTRY"
                    className="form-control"
                    placeholder="Your Country "
                    required
                  />
                </div>
              </div>

              {/* DATA PEMBIMBING START */}
              {/* DATA PEMBIMBING START */}
              <h1 className="text-sm md:text-lg lg:text-5xl">
                SUPERVISOR DATA
              </h1>
              <h1 className="garis-bawah"></h1>
              <div className="user-details">
                <div className="input-box">
                  <label for="NAME_SUPERVISOR" className="form-label">
                    Name of Teacher/Supervisor
                  </label>
                  <textarea
                    type="text"
                    id="NAME_SUPERVISOR"
                    name="NAME_SUPERVISOR"
                    className="form-control"
                    placeholder="Input Name of Teacher/Supervisor"
                    required
                  ></textarea>
                </div>
                <div className="input-box">
                  <label
                    for="WHATSAPP_NUMBER_SUPERVISOR"
                    className="form-label"
                  >
                    Teacher/Supervisor WhatsApp Number
                    <p>
                      Please write with phone code, example : (phone code) (your
                      number) +62 8177091xxxx
                    </p>
                  </label>
                  <input
                    type="number"
                    id="WHATSAPP_NUMBER_SUPERVISOR"
                    name="WHATSAPP_NUMBER_SUPERVISOR"
                    className="form-control"
                    placeholder="Input Teacher/Supervisor WhatsApp Number"
                    required
                  />
                </div>
                <div className="input-box">
                  <label for="EMAIL_TEACHER_SUPERVISOR" className="form-label">
                    Teacher/Supervisor Email Address
                  </label>
                  <input
                    type="email"
                    id="EMAIL_TEACHER_SUPERVISOR"
                    name="EMAIL_TEACHER_SUPERVISOR"
                    className="form-control"
                    placeholder="Input Teacher/Supervisor Email Address"
                    required
                  />
                </div>
              </div>
              {/* DATA PEMBIMBING END */}
              {/* DATA PEMBIMBING END */}

              {/* DETAIL PROJECT START */}
              {/* DETAIL PROJECT START */}
              <div className="">
                <h1 className="text-sm md:text-lg lg:text-5xl">
                  DETAIL PROJECT
                </h1>
                <h1 className="garis-bawah"></h1>
              </div>
              <div className="user-details">
                <div className="input-box">
                  <label for="PROJECT_TITLE" className="form-label">
                    Project Title
                  </label>
                  <textarea
                    type="text"
                    id="PROJECT_TITLE"
                    name="PROJECT_TITLE"
                    className="form-control"
                    placeholder="Input Your Project Title"
                    required
                    value={selectedMaxProject}
                    onChange={handleInputProjectChange}
                  ></textarea>
                  <p>
                    {selectedMaxProject.length} / {maxProjectChars} karakter
                  </p>
                </div>
                <div className="input-box">
                  <label for="CATEGORIES" className="form-label">
                    Categories
                  </label>
                  <select
                    id="CATEGORIES"
                    name="CATEGORIES"
                    className="form-control"
                    placeholder="--Choose-- "
                    required
                  >
                    <option value="">--Choose Categories--</option>
                    <option value="Technology">Technology</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Social Science">Social Science</option>
                    <option value="Environmental">Environment</option>
                    <option value="Life Science">Life Science</option>
                    <option value="Physic">Physic</option>
                    <option value="Education">Education</option>
                    <option value="Energy and Engineering">
                      Energy and Engineering
                    </option>
                  </select>
                </div>
                <div className="input-box">
                  <label for="YES_NO" className="form-label">
                    Does the project title have ever participated in an
                    invention and innovation competition before?
                  </label>
                  <select
                    type="text"
                    id="YES_NO"
                    name="YES_NO"
                    className="form-control"
                    placeholder="--Choose-- "
                    required
                  >
                    <option>--Choose--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="input-box">
                  <label
                    for="JUDUL_PERNAH_BERPATISIPASI"
                    className="form-label"
                  >
                    If the project title have ever participated in other
                    invention and innovation competition, please write down the
                    name of competition
                  </label>
                  <textarea
                    type="text"
                    id="JUDUL_PERNAH_BERPATISIPASI"
                    name="JUDUL_PERNAH_BERPATISIPASI"
                    className="form-control"
                    placeholder="Input Competition Name"
                  ></textarea>
                  <div className="mt-5" id="form_alerts"></div>
                </div>
              </div>

              {/* GENERAL INFORMATION START */}
              {/* GENERAL INFORMATION START */}
              <div className="">
                <h1 className="text-sm md:text-lg lg:text-5xl">
                  GENERAL INFORMATION
                </h1>
                <h1 className="garis-bawah"></h1>
              </div>
              <div className="user-details">
                <div className="input-box">
                  <label for="SOSMED" className="form-label">
                    If you don&apos;t have whatsapp number, please write down
                    your social media account. (Ex: Instagram/FB/Telegram/Line)
                  </label>
                  <label>
                    <p>
                      Copy your URL link(Ex:
                      https://www.instagram.com/iicyms_official/) or write your
                      username (Ex: iysa_official)
                    </p>
                  </label>
                  <input
                    type="text"
                    id="SOSMED"
                    name="SOSMED"
                    className="form-control"
                    placeholder="Input Your Social Media Account "
                    required
                  />
                </div>

                <div className="input-box">
                  <label for="INFORMATION_RESOURCES" className="form-label">
                    WYIIA 2025 Competition Information Resources
                  </label>
                  <select
                    type="text"
                    id="INFORMATION_RESOURCES"
                    name="INFORMATION_RESOURCES"
                    className="form-control"
                    placeholder="--Choose Information Resources-- "
                    required
                  >
                    <option value="">
                      --Select the Source of Information--
                    </option>
                    <option value="WYIIA Website">WYIIA Website</option>
                    <option value="IYSA Website">IYSA Website</option>
                    <option value="IYSA Instagram">IYSA Instagram</option>
                    <option value="WYIIA Instagram">WYIIA Instagram</option>
                    <option value="Supervisor/School">Supervisor/School</option>
                    <option value="IYSA Facebook">IYSA Facebook</option>
                    <option value="IYSA Linkedin">IYSA Linkedin</option>
                    <option value="IYSA Email">IYSA Email</option>
                    <option value="WYIIA Email">WYIIA Email</option>
                    <option value="Previous Event">Previous Event</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              <div className="button">
                <input type="submit" value="SUBMIT FORM" />
              </div>
            </form>

            {/* Loader dan Status Message */}
            {isLoading && (
              <div className="overlay-loader">
                <div className="loader"></div>
                <div>
                  {statusMessage && (
                    <p className="status-message">{statusMessage}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
