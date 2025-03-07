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
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode
    chrome_options.add_argument("--disable-gpu")  # Disable GPU acceleration
    chrome_options.add_argument("--window-size=1920,1080")  # Set window size
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option("useAutomationExtension", False)
    
    email = settings.Linkedin_Email
    password = settings.Linkedin_Password

    driver = webdriver.Chrome(options=chrome_options)
    try:
        driver.get("https://www.linkedin.com/login")

        # Wait for the email field to be present
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "username")))
        email_element = driver.find_element(By.ID, "username")
        email_element.send_keys(email)

        password_element = driver.find_element(By.ID, "password")
        password_element.send_keys(password)
        password_element.send_keys(Keys.RETURN)

        # Wait for the login to complete
        WebDriverWait(driver, 10).until(EC.url_contains("feed"))

        driver.get(url)

        # Wait for the job description to load
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "mt4")))

        page_source = driver.page_source

        # Parse the page source with BeautifulSoup
        soup = BeautifulSoup(page_source, "html.parser")

        # Find the job description section
        job_description = soup.find("div", {"class": "mt4"})

        if job_description:
            result = job_description.get_text(strip=True)
            print(result)
        else:
            result = "Job description not found."

        

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        driver.quit()