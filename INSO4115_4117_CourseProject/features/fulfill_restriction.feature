Feature: Restaurant Fulfills Restriction
We wish to evaluate if a given restaurant has satisfactory options for a patron with a certain restriction.

Scenario: Vegan restaurant 
    Given a patron has vegan as a restriction
    Given the specific restaurant has vegan options
    When they request to know if the restaurant has vegan options
    Then they "can" attend the restaurant

Scenario: Non vegan restaurant
    Given a patron has vegan as a restriction
    Given the specific restaurant does not have vegan options
    When they request to know if the restaurant has vegan options
    Then they "can not" attend the restaurant