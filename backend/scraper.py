from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from core.config import settings
from fastapi import HTTPException


def scrape_linkedin_job_description(url):
    print("Initializing Chrome options...")
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode
    chrome_options.add_argument("--disable-gpu")  # Disable GPU acceleration
    chrome_options.add_argument("--window-size=1920,1080")  # Set window size
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option("useAutomationExtension", False)
    
    email = settings.Linkedin_Email
    password = settings.Linkedin_Password

    print("Starting Chrome WebDriver...")
    driver = webdriver.Chrome(options=chrome_options)
    try:
        print("Navigating to LinkedIn login page...")
        driver.get("https://www.linkedin.com/login")

        print("Waiting for email field...")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "username")))
        email_element = driver.find_element(By.ID, "username")
        print("Entering email...")
        email_element.send_keys(email)

        password_element = driver.find_element(By.ID, "password")
        print("Entering password...")
        password_element.send_keys(password)
        password_element.send_keys(Keys.RETURN)

        print("Waiting for login to complete...")
        WebDriverWait(driver, 10).until(EC.url_contains("feed"))

        print(f"Navigating to job URL: {url}")
        driver.get(url)

        print("Waiting for job description to load...")
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "mt4")))

        page_source = driver.page_source
        print("Page source retrieved. Parsing with BeautifulSoup...")

        # Parse the page source with BeautifulSoup
        soup = BeautifulSoup(page_source, "html.parser")

        # Find the job description section
        print("Searching for job description section...")
        job_description = soup.find("div", {"class": "mt4"})

        if job_description:
            result = job_description.get_text(strip=True)
            print("Job description found:")
            print(result)
        else:
            result = "Job description not found."
            print(result)

        return result
    except Exception as e:
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        print("Closing the WebDriver...")
        driver.quit()