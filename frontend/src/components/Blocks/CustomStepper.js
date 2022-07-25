import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses
} from "@mui/material/StepConnector";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 8,
    left: "calc(-50% + 20px)",
    right: "calc(50% + 20px)"
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#0000000"
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#A8FBB3"
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#eaeaf0",
    borderTopWidth: 5,
    borderRadius: 5
  }
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: "#d1d1d1",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#000000"
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#A8FBB3",
    zIndex: 1,
    fontSize: 28
  },
  "& .QontoStepIcon-circle": {
    width: 16,
    height: 16,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  }
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool
};

const steps = [
  "Create Set",
  "Create Badges",
  "Run Transactions",
  "Mint Badges"
];

export default function CustomStepper(props) {
    const { activeStep } = props; 

  return (
    <Stack sx={{ width: "100%", mt:'40px' }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}